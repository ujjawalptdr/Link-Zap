import React from 'react'
import StyledButton from './StyledButton'

const Menu = ({ setLogin, setSignup, setAbout, setHome, setShowMenu }) => {
    return (
        <div className='absolute sm:hidden  right-0 top-14 rounded-md w-full min-h-56 bg-white py-10 px-14 animate-show'>
            <div className='flex flex-col items-end justify-center gap-6'>
                <ul className='flex flex-col gap-2 text-lg'>
                    <li> <span onClick={() => { setHome(true); setAbout(false); setShowMenu(false) }}>Home</span></li>
                    <li> <span onClick={() => { setHome(false); setAbout(true); setShowMenu(false) }}>About</span></li>
                </ul>
                <div className='flex gap-2 '>
                    <StyledButton label={"Signup"} onClick={() => { setSignup(true); setShowMenu(false) }} />
                    <StyledButton label={"Login"} onClick={() => { setLogin(true); setShowMenu(false) }} />
                </div>
            </div>
        </div>
    )
}

export default Menu