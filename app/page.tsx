import { auth } from "@/auth"
import { GameLoop } from "@/components/game/GameLoop"

export default async function Home() {
  const session = await auth()

  return (
    <div className="min-h-screen bg-zinc-950 font-sans">
      <GameLoop />
    </div>
  )
}
