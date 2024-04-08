import Image from "next/image"
import Link from "next/link"
import { ReactNode } from "react"

interface props {
    children : ReactNode
}

const Nav = ({
    children 
} : props) => {
    return (
        <nav className="w-full flex items-center py-2 md:py-3">
            <Link href={"/"}>
                <Image
                    src="/logo.svg"
                    alt="Spotta Logo"
                    width={92}
                    height={29}
                    priority
                />
            </Link>
            <>{children}</>
        </nav>
    )
}

export default Nav