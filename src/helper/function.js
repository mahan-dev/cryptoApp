
const convertData = (data, type) => {
 const converted =  data[type].map(item=> {
    return{
        date : new Date(item[0]).toLocaleString(),
        [type] : item[1]
    }
  })

 

  return converted 
};



export { convertData };
