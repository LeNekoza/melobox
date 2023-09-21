// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import ytdl from 'ytdl-core'
type Data = {
  resvalue:Object[]|string
}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
  if(req.query.url === 'Hello')
  { res.status(200).json({resvalue:'Hello from API'})
return}
  const handlerUrl= async()=>{
    let audioFormats:Array<Object> = []
    let audioIndex = 0
    const info = await ytdl.getInfo(req.query.url as string)
      .then((info)=>{
        info.formats.map((format)=>{
          if(format.mimeType?.slice(0,5) === "audio"){
            audioFormats[audioIndex] = format
            audioIndex++
          }
        })
      })

      res.status(200).json({resvalue:audioFormats})      
    } 

      handlerUrl()
    
 
  
    
  

}

