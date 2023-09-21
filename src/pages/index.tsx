"use client";
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useState  } from 'react'
import ytdl from 'ytdl-core'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const inter = Inter({subsets:['latin']});
export default function Home() {
  const imgPath = ['alternate','chill','rock','country','jazz','pop','rock']
  const [searchData, setSearchData] = useState('');
  const [audurl,setAudurl] = useState<string>('')
  const handleData = (data:string)=>{
    setSearchData(data)
  }
  const handleFetchURL = async (url:string) =>{
    setAudurl(url)
  }
  return (
    <div className={inter.className}>
     <Nav navProps={handleData} />
      {
        searchData === 'Not Found'?<div className='bg-palone text-palfour gap-5 font-bold flex flex text-center justify-center py-2'>
        <h1 className='relative translate-y-1'>Not Found</h1>
        </div>:
        searchData ===''?null:
        <div className='bg-palone text-palfour gap-5 font-bold flex flex text-center justify-center py-2'>
            <h1 className='relative translate-y-1'>{searchData}</h1>
            <button type='submit' className='text-[1.5em]'>▶️</button>
        </div>
      }
     
    {/*  <div id='reference-colors' className='flex text-center noselect'>
      <h1 className='text-white px-2'>Reference:</h1>
      <div className='w-1/5 bg-palone'>Palone</div>
      <div className='w-1/5 bg-paltwo'>Paltwo</div>
      <div className='w-1/5 bg-palthree'>Palthree</div>
      <div className='w-1/5 bg-palfour'>Palfour</div>
      <div className='w-1/5 bg-palfive'>Palfive</div>
      </div> */}
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
    const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=surfing&key=${process.env.NEXT_PUBLIC_APIKEY}&type=video&q=official english song ${search}`)
    const data = await res.json().then((data)=>data.items[0].snippet.title)
    setSearched(true)
    recievedData(data)
    console.log(data)}
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
          const res = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=surfing&key=${process.env.NEXT_PUBLIC_APIKEY2}&type=video&q=${fixedq}`)
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
        async function downloadVideo(thisurl:string) {
          let audioFormats:Array<Object> = []
          try {
              const info = await ytdl.getInfo(thisurl)
              let audioIndex = 0
               await
                info.formats.map((format)=>{
                  if(format.mimeType?.slice(0,5) === "audio"){
                    audioFormats[audioIndex] = format
                    audioIndex++
                  }
                })
              const checkForBetterBit = await audioFormats.reduce((prev:any, current:any) => (prev.audioBitrate > current.audioBitrate) ? prev.url:  current.url)
             if(typeof checkForBetterBit === 'string'){
                urlhandler(checkForBetterBit)
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
   
        <div className='bg-palfive w-auto h-[50em]'>  
        <ul className='grid gap-5 py-2 px-3'>
            {data.map((item,i)=>(
<li key={i}>
<div className='bg-palthree grid grid-cols-3 overflow-hidden'>
<div className='relative w-[10em] h-[5em]'>
  <Image
    className='z-10'
    src={item.thumbnailurl}
    alt={`photo of ${item.videotitle}`}
    layout="fill" 
    objectFit="cover" 
  />
</div>
<h1 className='flex items-center text-palfour underline underline-offset-[0.5em] ml-10'>{item.videotitle.substring(0,20)+'...'}</h1>
<button className='text-[2em]' onClick={()=>handleDownload(item.videoid)}>▶️</button>
</div>
</li>
     ))}
     {/* <button onClick={handleDownload} className='bg-yellow-500 w-1/5 active:bg-green-500'>😁</button> */}
     </ul>
  </div>
  )
}

const Player:React.FC<{url:string}> = ({url}) =>(

<AudioPlayer
  src={url}
  onPlay={e => console.log("onPlay")}
  autoPlayAfterSrcChange={true}
  className='sticky bottom-0 z-50'
  />

  )





