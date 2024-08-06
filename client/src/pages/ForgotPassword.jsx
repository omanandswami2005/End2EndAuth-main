
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>Enter your email below to reset your password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="captcha">Captcha</Label>
              <div className="flex items-center gap-2">
                <img
                  src="/placeholder.svg"
                  alt="Captcha"
                  width={100}
                  height={50}
                  className="rounded"
                  style={{ aspectRatio: "100/50", objectFit: "cover" }}
                />
                <Input id="captcha" type="text" placeholder="Enter captcha" required />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}