import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
// import Application from '@ioc:Adonis/Core/Application'
import UpdatePostValidator from 'App/Validators/UpdatePostValidator'
import { Attachment } from '@ioc:Adonis/Addons/AttachmentAdvanced'
import User from 'App/Models/User'
// import Category from 'App/Models/Category'
import Comment from 'App/Models/Comment'
import { schema } from '@ioc:Adonis/Core/Validator'
import { string } from '@ioc:Adonis/Core/Helpers'




export default class PostsController {

    public async index({response}:HttpContextContract){

        try{

            const posts = await Post.query()
            .preload('user')
            .preload('comments')
            .preload('user_posts_likes')
            .preload('post_user_views')
            .orderBy('id', 'desc')

            return response.ok({
                message:'Post queried successfully',
                posts: posts,
            })

        }catch(error){

            return response.internalServerError({
                message:'Error querying categories',
                error: error.message
            })

        }

    }

    // Search for post and user

    public async search({request, response}:HttpContextContract){

        const searchTerm = request.input('searchTerm');
        const term = string.noCase(searchTerm)
        // const searchTerm = escapeLike(params.term)
        // searchTerm.toLowerCase()
        
        try{

            if(term === ''){
                
                return response.ok({
                    message:'Search successful',
                    users:[],
                    posts:[],
                    text:term
                })
            }

            const users = await User.query()
            .whereRaw('LOWER(name) LIKE ?', [`%${term}%`]) // Use LOWER() function for non-case sensitive comparison
            .orWhereRaw('LOWER(username) LIKE ?', [`%${term}%`]) 
    
            const posts = await Post.query()
            .whereRaw('LOWER(body) LIKE ?', [`%${term}%`])
            .preload('user')
            .preload('comments')
            .preload('user_posts_likes')
            .preload('post_user_views')

            return response.ok({
                message:'Search successful',
                users:users,
                posts:posts,
                text:term
            })
            
        }catch(error){

            return response.status(500).send({
                message: 'An error occurred while searching.',
                error: error.message,
              });

        }
    }


    public async store({request, auth, response}:HttpContextContract){

        const validatedData = await request.validate(CreatePostValidator)

        try{

            const post = new Post()
            // post.categoryId = validatedData.categoryId,
            // post.title = validatedData.title
            post.body = validatedData.body,
            post.userId = auth.user!.id,
            post.image = Attachment.fromFile(validatedData.image)

            await post.save();

            response.created({
                message:'Post created successfully',
                post:post
            })

        }catch(error){
            
            response.internalServerError({
                message:'Failed to create post, please try again',
                error: error.message
            })
        }

    }


    public async download({params, response}:HttpContextContract){

        try{

            const post = await Post.query().where('id', params.id).first();
            const image = post?.image

            response.header('Content-Disposition', `attachment; filename=${image?.name}`);
            return response.attachment(image?.url!);

            // return response.ok({
            //     message:'Image founnd successfully',
            //     image: image
            // })

        }catch(error){

            return response.send({
                message:'Failed to get image',
                image:null
            })
        }
    }
    
    



    public async update({request, params, response, bouncer}:HttpContextContract){

        const validatedData = await request.validate(UpdatePostValidator)

        try{

            const post = await Post.findBy('id', params.id)

            if(!post){
                return response.notFound({
                    message:`This post with ${params.id} was not found`,
                    post:{}
                })
            }

            // authorization checks whether user.id = post.user_id
            if(await bouncer.with('PostPolicy').denies('update', post)){
                return response.unauthorized({
                    message:'Unauthorized Action, please check your permissions and try again.',
                    
                })
            }
    
            if(validatedData.image){
                post.image = Attachment.fromFile(validatedData.image)

            }
    
                // the updated the rest of the field
                post.body = validatedData.body,
                    
                await post.save()
                // return the update post
                return response.created({
                    message: 'Post updated successfully',
                    post: post
                })

        }catch(error){

            return response.internalServerError({
                message:'Error updating post',
                error: error.message
            })

        }

    }

    public async showOnePost ({params, auth, response}:HttpContextContract){

        try{

            // const post = await Post.findBy('uuid', params.uuid)
            const post = await Post.query()
            .where('uuid', params.uuid)
            .preload('user')
            .preload('user_posts_likes')
            .preload('post_user_views')
            .sideload(User)
            .first()


            if(!post){
                return response.notFound({
                    message:`No post found with this ${params.uuid}`
                })
            }

            
            const comments = await Comment.query()
            .where('post_id', post.id)
            .preload('user')
            .orderBy('id', 'desc')

            // updated view count for this post
            // view post created
             post.related('post_user_views').attach([auth.user?.id!]).catch((error) => {
                console.log(error.message);
             })

    
            return response.ok({
               message:'post found was successfully',
               post:post,
               comments:comments
            })

        }catch(error){

            return response.internalServerError({
                message:'Failed to fetch post',
                error:error.message
            })

        }


    }

    


    public async destroy ({params, response, bouncer}:HttpContextContract){


        try {

            // try to find the post first
            const post = await Post.findBy('id', params.id);

            if(!post){
                return response.notFound({
                    message:'Could not find post with id'
                })
            }

            // authorization checks whether user.id = post.user_id
            if(await bouncer.with('PostPolicy').denies('update', post)){
                return response.unauthorized({
                    message:'Unauthorized Action, please check your permissions and try again.',
                    
                })
            }            

            if(!post){
                return response.notFound({
                    message:`This post with ${params.id} was not found`,
                    post:{}
                })
            }

            // delete the post
            await post.delete()

            return response.ok({
                message:'Post deleted successfully',
                post:post
            })

        }catch(error){

            response.send({
                message: 'Failed to delete post',
                error:error.message
            })
        }

    }


    // like post
    public async like ({request, response}:HttpContextContract){

        const newLikeSchema = schema.create({
            postId: schema.number(),
            userId: schema.number(),
          })
        
        const payload = await request.validate({ schema: newLikeSchema })

        try{

            const user = await User.findBy('id', payload.userId)
            const post = await Post.findBy('id', payload.postId)

            await post!.related('user_posts_likes').attach([user!.id])

            return response.ok({
                message: 'Post liked successfully',
                user: user
            })

        }catch(error){

            return response.send({
                message: `${error.message}`,
                data:{}
            })

        }
    }


    // unlike
    public async unLike ({request, response}:HttpContextContract){

        const newLikeSchema = schema.create({
            postId: schema.number(),
            userId: schema.number(),
          })
        
        const payload = await request.validate({ schema: newLikeSchema })

        try{

            const user = await User.findBy('id', payload.userId)
            const post = await Post.findBy('id', payload.postId)

            await post!.related('user_posts_likes').detach([user!.id])
            return response.ok({
                message: 'Post unliked successfully',
                user: user
            })

        }catch(error){

            return response.send({
                message: `${error.message}`,
                data:{}
            })

        }
    }

}
