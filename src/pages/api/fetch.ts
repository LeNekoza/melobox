// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import ytdl from 'ytdl-core'
import Ffmpeg from 'fluent-ffmpeg'
import ffmpegPath from 'ffmpeg-static'
import fs from 'fs'
type Data = {
  resvalue:Object[]|string
}

Ffmpeg.setFfmpegPath(ffmpegPath as string)
export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
  if(req.query.url === 'Hello')
  { res.status(200).json({resvalue:'Hello from API'})
return}
  const handlerUrl= async()=>{
    let audioFormats:Array<Object> = []
    let audioIndex = 0

      const info = await ytdl.getInfo(req.query.url as string)
      const bestFormat = ytdl.chooseFormat(info.formats, {
        quality: "highest",
        filter: "audioonly",
      });
      /* console.log("bestFormat", bestFormat); */
      
     /*  res.status(200).json({resvalue: bestFormat.url}) */
     await new Promise((resolve, reject) => {
      Ffmpeg().input(ytdl.downloadFromInfo(info, { format: bestFormat }))
      .audioBitrate(128)
      .audioCodec('libmp3lame')
      .format('mp3')
      .on('end', ()=>{
        resolve(console.log('finished downloading'));
    })

    .on('error', (err)=>{
        console.log("Error downloading and converting audio:",err);
        reject(err);})
    .save(`./temp_files/${info.videoDetails.title.slice(0,10)}.mp3`)
      })
      const audioFile = `./temp_files/${info.videoDetails.title.slice(0,10)}.mp3`
      const stream = fs.createReadStream(audioFile)
      res.setHeader('Content-Type', 'audio/mpeg')
      stream.pipe(res);
      
      stream.on('close', ()=>{
        fs.unlinkSync(audioFile)
      })
    } 
  
    

      handlerUrl()
    
 
  
    
  

}

