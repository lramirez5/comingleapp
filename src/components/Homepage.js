import { Link } from 'react-router-dom'
import '../styles/Homepage.css'

export function HomepageComponent() {
    return (
        <div id="homepage">
            <div id="bkgrd"></div>
            <div id="landing">
                <div id="home-menu">
                    <div className="home-btn"><Link to='' >Listen</Link></div>
                    <div className="home-btn"><Link to='' >Updates</Link></div>
                    <div className="home-btn"><Link to=''>Gallery</Link></div>
                    <div className="home-btn"><Link to='' >Press</Link></div>
                    <div className="home-btn"><Link to=''>Contact</Link></div>
                </div>
                <img id="art" src="images/comingle_logo.png" />
                <div id="landing-content">
                    <div className="landing-panel">
                        <img id="vocals-cutout" className="cutout" src="images/vocals_cutout1.png" />
                    </div>
                    <div className="landing-panel">
                        <img id="sax-cutout" className="cutout" src="images/sax_cutout1.png" />
                    </div>
                    <div className="landing-panel">
                        <img id="keyboard-cutout" className="cutout" src="images/keyboard_cutout.png" />
                    </div>
                    <div className="landing-panel">
                        <img id="drums-cutout" className="cutout" src="images/drums_cutout.png" />
                    </div>
                    <div className="landing-panel">
                        <img id="guitar-cutout" className="cutout" src="images/guitar_cutout1.png" />
                    </div>
                </div>
                <div id="tile-menu">
                    <table>
                        <tr>
                            <td id="listen-tile"><Link to='' >Listen</Link></td>
                            <td id="player-tile"><div></div><iframe id="spotify-tile" src="https://open.spotify.com/embed/track/0TOFSOlHbkGEmw4ZvBcqHa?theme=0" width="80" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe></td>
                            <td id="updates-tile"><Link to='' >Updates</Link></td>
                        </tr>
                        <tr>
                            <td id="gallery-tile"><Link to=''>Gallery</Link></td>
                            <td id="press-tile"><Link to='' >Press</Link></td>
                            <td id="contact-tile"><Link to=''>Contact</Link></td>
                        </tr>
                    </table>
                    <div className="tile-btn"></div>
                    <div className="tile-btn"></div>
                    <div className="tile-btn"></div>
                    <div className="tile-btn"></div>
                    <div className="tile-btn"></div>
                </div>
            </div>
            <div id="extras-bar">
                <div id="links-bar">
                    <a href="https://open.spotify.com/artist/416B5nuGx3UzRNctcYeZQC" target="_blank" rel="noreferrer"><img id="spotify-link" src="images/spotify_icon.png" /></a>
                    <a href="https://music.apple.com/us/artist/co-mingle/1515029919" target="_blank" rel="noreferrer"><img id="apple-link" src="images/itunes_icon.png" /></a>
                    <a href="https://comingle.bandcamp.com/" target="_blank" rel="noreferrer"><img id="bandcamp-link" src="images/bandcamp_icon.png" /></a>
                    <br />
                    <a href="https://www.instagram.com/comingle.co/" target="_blank" rel="noreferrer"><img id="instagram-link" src="images/instagram_icon.png" /></a>
                    <a href="https://www.facebook.com/comingletingle/" target="_blank" rel="noreferrer"><img id="facebook-link" src="images/facebook_icon.png" /></a>
                    <a href="https://www.youtube.com/channel/UCi8upxV2kZ2XfBnDp5bea8Q" target="_blank" rel="noreferrer"><img id="youtube-link" src="images/youtube_icon.png" /></a>
                </div>
                <iframe id="spotify-song-sm" src="https://open.spotify.com/embed/track/0TOFSOlHbkGEmw4ZvBcqHa?theme=0" width="50%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                <div id="mailing-signup">
                    <form>
                        <label htmlFor="email">Join the CoMingle mailing list:</label><br />
                        <input id="emailbox" name="email" type="email" required placeholder="Email" />
                        <input id="submit" type="submit" />
                        <p id="result-text"></p>
                    </form>
                </div>
            </div>
            <iframe id="spotify-song-lg" src="https://open.spotify.com/embed/track/0TOFSOlHbkGEmw4ZvBcqHa?theme=0" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>

            {
                /*
                    <div id="spotify-player">
                        <iframe src="https://open.spotify.com/embed/artist/416B5nuGx3UzRNctcYeZQC" width="380" height="240" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                    </div>
                    <div id="apple-player">
                        <iframe allow="autoplay *; encrypted-media *; fullscreen *" frameborder="0" height="240" style={{ width: '100%', maxWidth: '380px', overflow: 'hidden', background: 'transparent' }} sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" src="https://embed.music.apple.com/us/album/we-cant-be-friends-single/1564765281"></iframe>
                    </div>
                    <div id="bandcamp-player">
                        <iframe style={{ border: '0', width: '240px', height: '240px' }} src="https://bandcamp.com/EmbeddedPlayer/track=3044466715/size=large/bgcol=333333/linkcol=e99708/minimal=true/transparent=true/" seamless><a href="https://comingle.bandcamp.com/track/we-cant-be-friends">We Can&#39;t Be Friends by CoMingle</a></iframe>
                    </div>
                */
            }
        </div>
    )
}