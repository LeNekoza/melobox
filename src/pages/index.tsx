"use client";
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { it } from 'node:test';
import { useEffect, useState  } from 'react'
 
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ReactAudioPlayer from 'react-audio-player';
const inter = Inter({subsets:['latin']});
export default function Home() {
  const imgPath = ['alternate','chill','rock','country','jazz','pop','rock']
  interface statetype{
    videotitle:string,
    videoid:string,
    thumbnailurl:string,
 }
  const [searchData, setSearchData] =  useState<statetype[]>([]);

  const handleDownload=(id:string)=>{
    async function downloadVideo(thisurl:string) {
      let audioFormats:Array<Object> = []
     try{
      const res = await fetch('https://p3000-z29c6aed8-zce7ec545-gtw.zb20e5e48.qovery.fr/',{
        method:'POST',
        body:thisurl,
        headers:{
          'Content-Type':'text/plain'
        },
      });
      if(res.ok){
      
        setAudurl(URL.createObjectURL(await res.blob()))
      }
        }
          
                 
      catch (err) {
          console.error("Try failed: ",err);
          return audioFormats
      }
      
  }
  const url = 'https://www.youtube.com/watch?v='+id;
  downloadVideo(url)
}
  const [audurl,setAudurl] = useState<string>('')
  const handleData = (data:statetype[])=>{
    setSearchData(data)
  }
  const handleFetchURL = async (url:string) =>{
    setAudurl(url)
  }
  return (
    <div className={inter.className}>
     <Nav navProps={handleData} />
      {
        searchData.length === 0 ? <div className='w-full bg-palfour h-[0.1em]'></div> :
        searchData === null? <div className='w-full bg-palfour h-[0.1em]'></div> :
        searchData === undefined? <div className='w-full bg-palfour h-[0.1em]'></div> :
        searchData.map((item,i)=>(
        <div key={"thekeyis"+i} className='bg-palone text-palfour gap-5 font-bold flex flex text-center justify-center py-2'>
            <h1 className='relative translate-y-1'>{item.videotitle}</h1>
            <button type='submit' className='text-[1.5em]' onClick={()=>handleDownload(item.videoid)}>▶️</button>
        </div>
        ))
      }
      <GenreAuto imgp={imgPath}/>
    <div className='w-full bg-palfour h-auto text-center text-[1.2em] mt-5 z-10 noselect'>
      <p>👾👾👾👾👾👾</p></div>
      <div className='grid md:grid-cols-2 w-full gap-10 px-[2em]'>
      <SongList fixedq='official english songs' urlhandler={handleFetchURL} />
      <SongList fixedq='vevo old english songs ' urlhandler={handleFetchURL}/>
      </div>
      <br/>
      <br/>
      <Player url={audurl}/>

    </div>
  )
}

const Nav:React.FC<{navProps:Function}> = ({navProps}) => {
  return (
    <div className="flex flex-col items-center w-full bg-palone/70 pt-2 sticky top-0 backdrop-blur-sm z-50">
    <p className='text-xl font-bold tracking-widest noselect dark:text-palfour text-center'>MELOBOX <span className='font-thin text-[0.75em]'>&copy; LeNekoza 👾</span></p>
    <Searchbox recievedData={navProps}/>
    <div className='w-full bg-palfour h-[0.1em]'></div>
    </div>
  )
}

const Searchbox:React.FC<{recievedData:Function}>=({recievedData})=>{
  
  const [search,setSearch] = useState('')
  const [searched,setSearched] = useState(false)
  const handleInput = (e:React.ChangeEvent<HTMLInputElement>) =>{
    setSearch(e.target.value)
    if(e.target.value === ''){
      setSearched(false)
    }
  }
  const searchByKeyword = async () => {
    try{
    if(search === ''){
      setSearched(false)
      recievedData('')
      return console.log("NO INPUT")
    
    }
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=surfing&key=${process.env.NEXT_PUBLIC_APIKEY3}&type=video&q=official english song ${search}`)
    const data = await res.json()
          if(data.error){
            console.log("Shit!: "+ data.error)
            return
          }
  const v_data = await data.items.map((item:any)=>{return {videotitle:item.snippet.title,videoid:item.id.videoId,thumbnailurl:item.snippet.thumbnails.default.url}})
    setSearched(true)
    recievedData(v_data)
    console.log(v_data)}
    catch(err){
      console.log(
        "NO MATCH FOUND")
        recievedData('Not Found')
    }
  }
  useEffect(()=>
  {
    if(searched === false){
      return
    }
    console.log("Results for: " + search)
  
  },[search,searched])

  return(
    <div className='w-1/2 flex justify-center' >
    <input type='search' className='h-[2em] bg-purple-300/20 text-right focus:outline-none focus:bg-purple-200/20 focus:border-none border-white/0 focus:ring-white/0 text-white placeholder:text-purple-300' required autoComplete='false' autoCorrect='false'  placeholder='Search for a song...' 
    onInput={handleInput}/>
    <button type='submit' className='bg-palthree hover:bg-paltwo' onClick={searchByKeyword}>
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2em" height="2em" fill="white" viewBox="0 0 24 24">
<path d="M22 20L20 22 14 16 14 14 16 14z"></path><path d="M9,16c-3.9,0-7-3.1-7-7c0-3.9,3.1-7,7-7c3.9,0,7,3.1,7,7C16,12.9,12.9,16,9,16z M9,4C6.2,4,4,6.2,4,9c0,2.8,2.2,5,5,5 c2.8,0,5-2.2,5-5C14,6.2,11.8,4,9,4z"></path><path d="M13.7 12.5H14.7V16H13.7z" transform="rotate(-44.992 14.25 14.25)"></path>
</svg>
</button>
</div>
  )}

const GenreAuto:React.FC<{imgp:string[]}> = ({imgp}) =>{
  return(
    <div id="genreauto">
        <div className="px-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 my-5  gap-2">
       {Array.from({length: 6}, (_, i) => i).map((i) => (
        <button key={i} className='grid grid-cols-2 gap-4 items-center text-[0.8em] font-bold bg-palone text-palfour overflow-hidden hover:scale-105 hover:bg-palthree hover:z-20 transition-linear duration-500 '>
        
          <Image src={"/images/"+imgp[i]+".jpg"} alt={imgp[i]} width={200} height={200} sizes='' priority/>
       
        <h1>{imgp[i].toUpperCase()}</h1>
      </button>
       ))}
       </div>
       </div>
  )
}


const SongList:React.FC<{ fixedq: string; urlhandler: (url: string) => void }> = ({ fixedq, urlhandler }) =>
{
 interface statetype{
    videotitle:string,
    videoid:string,
    thumbnailurl:string,
 }
  const [data,setData] = useState<statetype[]>([])

  //call once on page load
  useEffect(() => {
        async function fetchYTData() {
          try{
          const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=surfing&key=${process.env.NEXT_PUBLIC_APIKEY3}&type=video&q=${fixedq}`)
          const data = await res.json()
          if(data.error){
            console.log("Shit!: "+ data.error)
            return
          }
          const v_data = await data.items.map((item:any)=>{return {videotitle:item.snippet.title,videoid:item.id.videoId,thumbnailurl:item.snippet.thumbnails.default.url}})
          setData(v_data)
          console.log(v_data)}
          catch(err){
            console.log(err)
          }
        } 
        fetchYTData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[])
      const handleDownload=(id:string)=>{
        console.log("Button Clicked")
        async function downloadVideo(thisurl:string) {
          let audioFormats:Array<Object> = []
         try{
          const res = await fetch('https://p3000-z29c6aed8-zce7ec545-gtw.zb20e5e48.qovery.fr/',{
            method:'POST',
            body:thisurl,
            headers:{
              'Content-Type':'text/plain'
            },
          });
          if(res.ok){
             urlhandler(URL.createObjectURL(await res.blob()))
          }
            }
     
          catch (err) {
              console.error("Try failed: ",err);
              return audioFormats
          }
          
      }
      const url = 'https://www.youtube.com/watch?v='+id;
      downloadVideo(url)
  }

  return(
   
        <div className='bg-paltwo w-auto h-[50em] rounded-lg'>  
        <ul className='grid gap-5 py-2 px-3'>
            {data.map((item,i)=>(
            
<li key={i}>
<div className='bg-stone-900 grid grid-cols-3 gap-5 overflow-hidden h-[5em]  rounded-lg'>
<div className='relative w-[5em] lg:w-[10em] h-[5em]'>
  <Image
    className='z-10 noselect'
    src={item.thumbnailurl}
    alt={`photo of ${item.videotitle}`}
    layout="fill" 
    objectFit="cover" 
  />
</div>
<div className='flex items-center'>
<h1 className='text-palfour underline underline-offset-[0.5em] ml-1 lg:ml-5 tracking-tight noselect '>{item.videotitle.substring(0,30)+'...'}</h1>
</div>
<button className='text-[2em] flex justify-center items-center bg-black focus:bg-black/50 fill-white active:fill-lime-400' onClick={()=>handleDownload(item.videoid)}>
<svg  width="30" height="30" viewBox="0 0 1200 1200" version="1.1" xmlns="http://www.w3.org/2000/svg">
<path opacity="1.00" d=" M 228.84 104.20 C 515.28 265.18 801.74 426.11 1088.21 587.02 C 801.76 747.95 515.30 908.86 228.88 1069.84 C 258.29 1033.57 284.46 994.74 308.62 954.81 C 347.67 889.65 380.67 820.47 402.40 747.55 C 415.09 704.75 423.71 660.61 426.12 615.98 C 428.76 568.50 423.54 520.81 413.21 474.46 C 403.38 430.51 388.98 387.66 371.58 346.14 C 346.93 287.56 316.41 231.53 281.80 178.25 C 265.18 152.86 247.86 127.87 228.84 104.20 Z" />
</svg>
</button>
</div>
</li>
     ))}
     </ul>
  </div>
  )
}

const Player:React.FC<{url:string}> = ({url}) =>{
  console.log(url)
  return(
  <audio
  controls
  src={url}
  id='audioControl'
  autoPlay
  muted={false}
  onError={(e)=>console.log({e})}
  className='sticky bottom-0 z-50 w-full'
  />
)

}