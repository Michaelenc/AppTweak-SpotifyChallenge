import './Header.css';

export default function Header({height}:{height:number}){
    return (
      <>
        <header style={{height:height}} className='header'>
          <div className='headerLogoContainer'>
            <img src="./AppTweak_logo_1920.png" alt="logo AppTweak" className="headerLogo"/>
          </div>
          <div className='headerTitleContainer'>
            <h1 className='headerTitle'>Spotify challenge</h1>
          </div>
        </header>
      </>
    )
}