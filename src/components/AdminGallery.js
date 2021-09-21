import React, { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { listCMImages, listGalleries } from '../graphql/queries';
import { createCMImage as createCMImageMutation, createGallery as createGalleryMutation, deleteCMImage as deleteCMImageMutation, updateGallery as updateGalleryMutation } from '../graphql/mutations';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';

const initialFormState = { image: null, title: '', subtitle: '', credit: '', date: null }

export function AdminGalleryComponent() {
    const [gallery_id, setGalleryId] = useState("")
    const [images, setImages] = useState([]);
    const [original_images, setOriginalImages] = useState([])
    const [original_filenames, setOriginalFilenames] = useState([])
    const [filenames, setFilenames] = useState([])
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        fetchImages();
    }, []);

    async function fetchImages() {
        const apiData = await API.graphql({ query: listGalleries });
        //console.dir(apiData)
        setGalleryId(apiData.data.listGalleries.items[0].id)
        const galleryFromAPI = []
        apiData.data.listGalleries.items[0].images.forEach(img => galleryFromAPI.push(JSON.parse(img)))
        //console.dir(galleryFromAPI)
        var names = []
        await Promise.all(galleryFromAPI.map(async img => {
            if (img.image) {
                names.push(img.image)

                const image = await Storage.get(img.image);
                img.image = image;
            }
            return img;
        }))

        setImages(galleryFromAPI)
        setFilenames(names)
        setOriginalImages(galleryFromAPI)
        setOriginalFilenames(names)
        //console.dir(names)

        /*const apiData = await API.graphql({ query: listCMImages });
        const imagesFromAPI = apiData.data.listCMImages.items;
        await Promise.all(imagesFromAPI.map(async img => {
            if (img.image) {
                const image = await Storage.get(img.image);
                img.image = image;
            }
            return img;
        }))
        console.dir(apiData.data.listCMImages.items)
        setImages(apiData.data.listCMImages.items);*/
    }

    async function makeGallery() {
        try {
            if (!images) return
            var imgs = []
            images.forEach(img => {
                imgs.push(JSON.stringify(img))
            })
            const data = { images: imgs }
            //console.dir(data)
            //console.log(data)
            //return
            await API.graphql({ query: createGalleryMutation, variables: { input: data } })
        } catch (e) {
            console.log(e)
            console.dir(images)
        }
    }

    async function cancelGalleryUpdate() {
        document.getElementById("gallery-update").style.display = 'none'
        document.getElementById("cancel-update").style.display = 'none'
        setImages(original_images)
        setFilenames(original_filenames)
    }

    async function updateGalleryLayout() {
        document.getElementById("gallery-update").style.display = 'none'
        document.getElementById("cancel-update").style.display = 'none'
        var updatedGalleryImages = []
        /*console.log('test')
        console.dir({...images[0], image: filenames[0]})
        console.log('test2')
        console.dir(images[0])*/

        images.forEach((img, i) => {
            updatedGalleryImages.push(JSON.stringify({ ...img, image: filenames[i] }))
        })
        /*console.log("Images array:")
        console.dir(images)
        console.log("Data array:")
        console.dir(updatedGalleryData)*/
        var updatedGalleryData = { id: gallery_id, images: updatedGalleryImages }
        try {
            await API.graphql({ query: updateGalleryMutation, variables: { input: updatedGalleryData } });
        } catch (e) {
            console.log(e)
        }
        setOriginalImages(images)
        setOriginalFilenames(filenames)
    }

    async function createImage() {
        //try {
        if (!formData.image) return;

        var galleryImages = []
        images.forEach((img, i) => {
            galleryImages.push(JSON.stringify({ ...img, image: filenames[i] }))
        })
        var updatedGalleryData = { id: gallery_id, images: [JSON.stringify(formData), ...galleryImages] }
        //console.dir(updatedGalleryData)
        try {
            await API.graphql({ query: updateGalleryMutation, variables: { input: updatedGalleryData } });
            if (formData.image) {
                setOriginalFilenames([formData.image, ...filenames])
                const image = await Storage.get(formData.image);
                formData.image = image;
            }
            setOriginalImages([formData, ...images])
            setImages([formData, ...images]);
            clearFormData()
            setFormData(initialFormState);

        } catch (e) {
            console.log(e)
        }

        function clearFormData() {
            document.getElementById("file-picker").value = '';
            document.getElementById("title-input").value = '';
            document.getElementById("subtitle-input").value = '';
            document.getElementById("credit-input").value = '';
            document.getElementById("date-input").value = '';
        }

        /*
        var data = { id: gallery_id, images: null }
        await API.graphql({ query: createCMImageMutation, variables: { input: formData } });
        if (formData.image) {
            const image = await Storage.get(formData.image);
            formData.image = image;
        }
        setImages([formData, ...images]);
        setFormData(initialFormState);
        */
        //} catch (e) {
        //    console.log(e)
        //}
        setTimeout(async function() {
            console.log('fetching')
            fetchImages()
        }, 5000);
    }

    async function deleteImage(i) {
        //console.log(i)
        //Array.prototype.forEach.call(document.getElementsByClassName('delete-btn'), el => el.style.display = "none")
        setImages([...images.slice(0, i), ...images.slice(i + 1)])
        setFilenames([...filenames.slice(0, i), ...filenames.slice(i + 1)])
        document.getElementById("gallery-update").style.display = "block"
        document.getElementById("cancel-update").style.display = "block"
    }

    /*    async function deleteImage({ id }) {
            console.log(`Deleting ${id}`)
            const newImagesArray = images.filter(img => img.id !== id);
            setImages(newImagesArray);
            await API.graphql({ query: deleteCMImageMutation, variables: { input: { id } } });
        }
    */
    async function onChange(e) {
        if (!e.target.files[0]) return
        const file = e.target.files[0];
        setFormData({ ...formData, image: file.name });
        await Storage.put(file.name, file);
        fetchImages();
    }

    var clicked_img = null
    var selected = false

    function selectPos(e) {
        console.dir(e.target)
        var el = e.target
        var imgs = document.getElementsByClassName("img-sm")
        //console.dir(imgs)
        while (!el.className.includes("img-sm")) {
            el = el.parentElement
        }
        console.dir(el)
        for (let j = 0; j < imgs.length; j++) {
            document.getElementsByClassName('delete-btn')[j].style.display = "none"
            if (el.id === imgs[j].id) {
                el.classList.toggle("selected")
                if (el.id === clicked_img) {
                    selected = false
                    clicked_img = null
                } else {
                    selected = true
                    clicked_img = el.id
                    document.getElementsByClassName('delete-btn')[j].style.display = "block"
                }
            } else {
                imgs[j].classList.remove("selected")
            }
        }
        var position_btns = document.getElementsByClassName("positioner")
        //console.dir(position_btns)
        if (selected) {
            Array.prototype.forEach.call(position_btns, (btn) => btn.style.display = "block")
        } else {
            Array.prototype.forEach.call(position_btns, (btn) => btn.style.display = "none")
        }

        /*if(selected === false) {
            el.classList.add("selected")
            selected = true
            clicked_img = i
        }*/

        //console.log(clicked_img, selected)

    }

    function setPos(e) {
        var sib = e.target.nextSibling
        var res = images.length
        if (sib) {
            var id_to_find = sib.id
            res = images.indexOf(images.find(x => x.image.substring(0,101) === id_to_find))
        }
        var mover = images.indexOf(images.find(x => x.image.substring(0,101) === clicked_img))
        Array.prototype.forEach.call(document.getElementsByClassName("positioner"), (btn) => btn.style.display = "none")
        Array.prototype.forEach.call(document.getElementsByClassName("img-sm"), (img) => img.classList.remove("selected"))
        //console.log("Current filenames list")
        //console.dir(filenames)
        if (res === mover) {
            return
        } else if (res > mover) {
            setImages([...images.slice(0, mover), ...images.slice(mover + 1, res), images[mover], ...images.slice(res)])
            setFilenames([...filenames.slice(0, mover), ...filenames.slice(mover + 1, res), filenames[mover], ...filenames.slice(res)])
        } else if (res < mover) {
            setImages([...images.slice(0, res), images[mover], ...images.slice(res, mover), ...images.slice(mover + 1)])
            setFilenames([...filenames.slice(0, res), filenames[mover], ...filenames.slice(res, mover), ...filenames.slice(mover + 1)])
        }
        //console.log("New filenames list:")
        //console.dir(filenames)
        document.getElementById("gallery-update").style.display = "block"
        document.getElementById("cancel-update").style.display = "block"
    }

    function showAddDetails() {
        var el = document.getElementById("add-img-details")
        if(el.style.display === "flex") {
            el.style.display = "none"
            document.getElementById("add-details-btn").innerHTML = "Add details"
        } else {
            el.style.display = "flex"
            document.getElementById("add-details-btn").innerHTML = "Hide details"
        }
        
    }

    return (
        <div className="App">
            <AmplifyAuthenticator>
                <AmplifySignIn slot="sign-in">
                    <div slot="secondary-footer-content"></div>
                </AmplifySignIn>
                <AmplifySignOut />
                <h1>CoMingle Gallery</h1>
                <div id="add-img-panel">
                    <input
                        type="file"
                        id="file-picker"
                        onChange={onChange}
                        required
                    />
                    <br/>
                    <button id="add-details-btn" onClick={showAddDetails}>Add details</button>
                    <br/>
                    <div id="add-img-details">
                        <input
                            id="title-input"
                            onChange={e => setFormData({ ...formData, 'title': e.target.value })}
                            placeholder="Image title"
                            value={formData.title}
                        />
                        <input
                            id="subtitle-input"
                            onChange={e => setFormData({ ...formData, 'subtitle': e.target.value })}
                            placeholder="Image description"
                            value={formData.subtitle}
                        />
                        <input
                            id="credit-input"
                            onChange={e => setFormData({ ...formData, 'credit': e.target.value })}
                            placeholder="Image credit"
                            value={formData.credit}
                        />
                        <input
                            id="date-input"
                            onChange={e => setFormData({ ...formData, 'date': `${e.target.value.split('-')[1]}-${e.target.value.split('-')[2]}-${e.target.value.split('-')[0]}` })}
                            type="date"
                        />
                    </div>
                    <br/>
                    <button onClick={createImage}>Post Image</button>
                </div>
                <button id="gallery-update" onClick={updateGalleryLayout} style={{ display: 'none' }}>Save This Layout</button>
                <button id="cancel-update" onClick={cancelGalleryUpdate} style={{ display: 'none' }}>Revert Changes</button>
                <div id="img-board">
                    <div id="top-imgs">
                        {
                            images.map((img, i) => (
                                i < 4 &&
                                <div style={{ position: "relative", zIndex: "2" }}>
                                    <div className="positioner" onClick={setPos}>+ Move to position {i + 1}</div>
                                    <div className="img-sm" key={img.image.substring(0,101)} id={img.image.substring(0,101)} onClick={selectPos}>

                                        {
                                            img.image && <div className="img-image"><div className="num-tag">{i + 1}<div className="delete-btn" onClick={() => deleteImage(i)}>X</div></div><img src={img.image} /></div>
                                        }
                                        <div className="img-info">
                                            <div className="img-title">{img.title}</div>
                                            <div className="img-desc">{img.subtitle}</div>
                                            <div className="img-cred">{img.credit && <span>{img.credit}</span>} {img.credit && img.date && <span> - </span>} {img.date && <span>{img.date}</span>}</div>
                                            {!img.title && <br/>}{!img.subtitle && !img.credit && !img.date && <div><br/><br/></div>}
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div class="tape"><div>Have a pic for our board? <Link to='/contact'>Contact us!</Link></div></div>
                    <div id="other-imgs">
                        {
                            images.map((img, i) => (
                                i >= 4 &&
                                <div style={{ position: "relative", zIndex: "2" }}>
                                    <div className="positioner" onClick={setPos}>+ Move to position {i + 1}</div>
                                    <div className="img-sm" key={img.image.substring(0,101)} id={img.image.substring(0,101)} onClick={selectPos}>

                                        {
                                            img.image && <div className="img-image"><div className="num-tag">{i + 1}<div className="delete-btn" onClick={() => deleteImage(i)}>X</div></div><img src={img.image} /></div>
                                        }
                                        <div className="img-info">
                                            <div className="img-title">{img.title}</div>
                                            <div className="img-desc">{img.subtitle}</div>
                                            <div className="img-cred">{img.credit && <span>{img.credit}</span>} {img.credit && img.date && <span> - </span>} {img.date && <span>{img.date}</span>}</div>
                                            {/*<div className="img-date">{img.date}</div>*/}
                                        </div>
                                    </div>
                                    {i == images.length - 1 && <div className="positioner" onClick={setPos} style={{ top: '100%' }}>+ Move to last position</div>}
                                </div>
                            ))
                        }
                    </div>
                    {images[0] && <img id="art-splash" src="../images/comingle_logo.png" />}
                </div>
            </AmplifyAuthenticator>
        </div>
    );
}