const sanityClient = require('@sanity/client')



 const client = sanityClient.createClient({
    projectId: 'uf7g5p8y',
  dataset: 'production',
  useCdn:false,
  apiVersion:"2021-10-21",
  token:'skRZG7tCSTkUoXyx6JkGmbLer1jFGMmSY6IZjCU9BsmhS8VMUhgnWtRfAKIyxdQmxlIpOnp1us7Syk6tmSvUZvOVnpgmK1bp8lasajL7v2EN3WlLerAzm0sbUKwWoLnDXu3vrSK9Tjp0jIYHPWRcARVSmDoOhuKle5EMUCLOdD7Ny6TlGwes'
  })

 async function updateDocument() {
    const date = new Date()
    var restaurants = []
    if(date.getUTCHours() === 15){
        client.fetch('*[ _type== "restaurant"]').then(res =>{
            console.log(res)
        restaurants = res
        restaurants.map(restaurant => {
            if(restaurant.status === true){
                client.patch(restaurant._id).set({status:false}).commit().then(res => console.log(res)).catch(err => console.log(err))
            }
        })
        } 
        ).catch(err => console.log(err))
    }
    
    console.log(date.getHours())
    console.log(date.getUTCHours())

  }
  //set interval to run every 1 hour
 function interval(){
    setInterval(updateDocument, 10000)
}

  module.exports = interval