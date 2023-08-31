import moment from 'moment'

export const useUtils = () => {

// compoasble for formatting date an timestamp
// format:string
  const formateDateTime = (value:string | any) =>{
    // return moment(value).format(format);
    return moment(value).fromNow();
  }


  return{
    formateDateTime
  }

}
