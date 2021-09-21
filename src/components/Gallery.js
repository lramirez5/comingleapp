import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { listGalleries } from '../graphql/queries';
import '../styles/Gallery.css'
import { Link } from 'react-router-dom';
import { MenuBarComponent } from './MenuBar';

export function GalleryComponent() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        var el = document.getElementById("img-board")
        el.style.width = "84vw"
        setTimeout(function(){ el.style.width = "86vw" }, 2000);
    }, [images])

    async function fetchImages() {
        const apiData = await API.graphql({ query: listGalleries });
        const galleryFromAPI = []
        apiData.data.listGalleries.items[0].images.forEach(img => galleryFromAPI.push(JSON.parse(img)))
        await Promise.all(galleryFromAPI.map(async img => {
            if (img.image) {
                const image = await Storage.get(img.image);
                img.image = image;
            }
            return img;
        }))

        setImages(galleryFromAPI)
        console.dir(galleryFromAPI)
    }

    /*
    async function fetchImages() {
        const apiData = await API.graphql({ query: listCMImages });
        const imagesFromAPI = apiData.data.listCMImages.items;
        await Promise.all(imagesFromAPI.map(async img => {
            if (img.image) {
                const image = await Storage.get(img.image);
                img.image = image;
            }
            return img;
        }))
        console.dir(apiData.data.listCMImages.items)
        setImages(apiData.data.listCMImages.items);
    }
    */

    function enlargeImage(i) {
        document.getElementById("enlarge").style.display = "block"
        document.getElementById("enlarged-img").src = images[i].image
    }

    function closeEnlarge() {
        document.getElementById("enlarge").style.display = "none"
        document.getElementById("enlarged-img").src = ""
    }

    return (
        <div className="App gallery">
            <MenuBarComponent />
            <div id="enlarge" onClick={closeEnlarge}>{/*<div id="exit-enlarge" onClick={closeEnlarge}>X</div>*/}<img id="enlarged-img" sr="" /></div>
            <div id="img-board">
                <div id="top-imgs">
                    {
                        images.map((img, i) => (
                            i < 4 &&
                            <div className="img-sm" onClick={() => enlargeImage(i)} key={img.image.substring(0,101)} style={{ transform: `rotate(${(Math.floor(Math.random() * 3) + .5) * Math.pow(-1, Math.floor(Math.random() * 4))}deg)` }}>
                                {
                                    img.image && <div className="img-image"><div className="img-overlay"></div><img src={img.image} /></div>
                                }
                                <div className="img-info">
                                    <div className="img-title">{img.title}</div>
                                    <div className="img-desc">{img.subtitle}</div>
                                    <div className="img-cred">{img.credit && <span>{img.credit}</span>} {img.credit && img.date && <span> - </span>} {img.date && <span>{img.date}</span>}</div>
                                    {/*<div className="img-date">{img.date}</div>*/}
                                </div>
                                <div className="pin" style={{ left: `${Math.floor(Math.random() * 60) + 20}%`, top: `${Math.floor(Math.random() * 4)}%`, filter: `hue-rotate(${Math.floor(Math.random() * 36) * 10}deg)` }}></div>
                            </div>
                        ))
                    }
                </div>
                <div class="tape"><div>Have a pic for our board? <Link to='/contact'>Contact us!</Link></div></div>
                <div id="other-imgs">
                    {
                        images.map((img, i) => (
                            i >= 4 &&
                            <div className="img-sm" onClick={() => enlargeImage(i)} key={img.image.substring(0,101)} style={{ transform: `rotate(${(Math.floor(Math.random() * 3) + .5) * Math.pow(-1, Math.floor(Math.random() * 4))}deg)` }}>
                                {
                                    img.image && <div className="img-image"><div className="img-overlay"></div><img src={img.image} /></div>
                                }
                                <div className="img-info">
                                    <div className="img-title">{img.title}</div>
                                    <div className="img-desc">{img.subtitle}</div>
                                    <div className="img-cred">{img.credit && <span>{img.credit}</span>} {img.credit && img.date && <span> - </span>} {img.date && <span>{img.date}</span>}</div>
                                    {/*<div className="img-date">{img.date}</div>*/}
                                </div>
                                <div className="pin" style={{ left: `${Math.floor(Math.random() * 60) + 20}%`, top: `${Math.floor(Math.random() * 4)}%`, filter: `hue-rotate(${Math.floor(Math.random() * 36) * 10}deg)` }}></div>
                            </div>
                        ))
                    }
                </div>
                {images[0] && <img id="art-splash" src="../images/comingle_logo.png" />}
            </div>
        </div>
    );
}