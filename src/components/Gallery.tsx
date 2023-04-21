import { useEffect, useRef, useState } from "react"
import './Gallery.scss'

function Gallery() {
  const images = [
    { id: 0, src: 'https://images.musicstore.de/images/1600/dw-collectors-set-maple-vlt-333-candy-black-burst-exotic-over-monkey-pod_1_DRU0040287-000.jpg' },
    { id: 1, src: 'https://thumbs.static-thomann.de/thumb/bdbmagic/pics/bdb/471398/15108893_800.jpg ' },
  ]

  const [current, setCurrent] = useState(0);

  const imageElement = useRef<HTMLImageElement>(null);
  const imageContainer = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if(!imageContainer.current || !imageElement.current) return;
    const imgRects = imageContainer.current.getBoundingClientRect();

    const distanceLeft = Math.abs(e.clientX - imgRects.left);
    const distanceTop = Math.abs(e.clientY - imgRects.top);
    
    imageElement.current.style.setProperty('transform-origin', `${distanceLeft}px ${distanceTop}px`);
  }

  const fullScreen = () => {
    imageElement.current?.classList.toggle('full-screen');
  }

  useEffect(() => {
    const image = imageElement.current;
    image?.addEventListener('mousemove', handleMouseMove)
    return () => {
      image?.removeEventListener('mousemove', handleMouseMove)
    }
  })

  const getImage = () => {
    return images[current].src
  }
  
  return (
    <div className="gallery">
      <div ref={imageContainer} className="image-container">
        <img ref={imageElement} onClick={fullScreen} id="mainImage" src={getImage() } alt="image" />
      </div>
    </div>
  )
}

export default Gallery;