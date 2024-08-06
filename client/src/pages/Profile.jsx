
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { CartesianGrid, XAxis, Line, LineChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Profile() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col gap-4 bg-card p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="font-medium">John Doe</div>
            <div className="text-muted-foreground text-sm">john@example.com</div>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-1">
            <div className="text-xs font-medium uppercase text-muted-foreground">About</div>
            <div className="text-sm">
              I'm a software engineer with a passion for building beautiful and functional web applications.
            </div>
          </div>
          <div className="grid gap-1">
            <div className="text-xs font-medium uppercase text-muted-foreground">Joined</div>
            <div className="text-sm">June 1, 2021</div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-card p-6 rounded-lg shadow-sm">
        <LinechartChart className="w-full aspect-[4/3]" />
      </div>
    </div>
  )
}

function LinechartChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
      >
        <LineChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  )
}