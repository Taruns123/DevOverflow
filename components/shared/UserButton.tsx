import Image from 'next/image'
import React from 'react'

const UserButton = ({ picture }: { picture: string }) => {
    return (
        <div><Image
            src={picture}
            alt={'user'}
            width={35}
            height={35}
            className='rounded-full'

        /></div>
    )
}

export default UserButton