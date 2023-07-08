import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
})

export default function MuscleLayout({children}) {
    return (
        <main className={roboto.className}>
            {children}
        </main>
    );
}