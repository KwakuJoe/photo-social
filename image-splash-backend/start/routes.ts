/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

    // auth routes
    Route.group(() => {
        Route.post('signup', 'Auth/AuthController.signup')
        Route.post('signin', 'Auth/AuthController.signin')
        Route.get('logout', 'Auth/AuthController.signout')
        Route.get('user/:username/posts', 'Auth/AuthController.getOneUserProfile')  
        Route.get('profile/:username', 'Auth/AuthController.profile').middleware('auth')
        Route.post('profile/:id/update', 'Auth/AuthController.updatedProfile').middleware('auth')
    })   




    // Posts
    Route.group(() => {
        // post resource routes
        Route.resource('posts','Post/PostsController').apiOnly().middleware({
            store:'auth',
            destroy:'auth',
            update:'auth',
        })

        // per post using username
        Route.get('post/:uuid', 'Post/PostsController.showOnePost').middleware('auth')

        // like post
        Route.post('post/like', 'Post/PostsController.like').middleware('auth')

        // unlike post
        Route.post('post/unlike', 'Post/PostsController.unLike').middleware('auth')

        // search user and post
        Route.post('/search', 'Post/PostsController.search').middleware('auth');

        // test download
        Route.get('/download/:id', 'Post/PostsController.download')

    })


    // category
    Route.resource('categories','Category/CategoriesController').apiOnly().middleware({
        store:'auth',
        destroy:'auth',
        update:'auth',
        // index:'auth'
    })

    Route.group(()=> {
            // collection
            Route.resource('collections','Collection/CollectionsController').apiOnly().middleware({
                store:'auth',
                destroy:'auth',
                update:'auth',
                // index:'auth',
            })
    })

    
    // Comments
    Route.resource('comments', 'Comment/CommentsController').apiOnly().middleware({
        store:'auth',
        destroy:'auth',
        update:'auth',
        index:'auth',
    })


    
}).prefix('api')
