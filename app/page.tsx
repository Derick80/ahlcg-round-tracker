import { auth, signIn, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"

export default async function Home() {
  const session = await auth()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-md w-full">
        {session ? (
          <Card>
            <CardHeader>
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>You are signed in as {session.user?.email}</CardDescription>
            </CardHeader>
            <CardFooter>
              <form
                action={async () => {
                  "use server"
                  await signOut()
                }}
              >
                <Button variant="outline" type="submit">Sign Out</Button>
              </form>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your email to receive a magic link.</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                action={async (formData) => {
                  "use server"
                  await signIn("resend", formData)
                }}
                className="flex flex-col gap-4"
              >
                <Input type="email" name="email" placeholder="hello@example.com" required />
                <Button type="submit">Send Magic Link</Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
