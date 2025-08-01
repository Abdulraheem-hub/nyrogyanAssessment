import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { resetWelcomeAnimation } from '@/utils/welcomeUtils'

export default function WelcomeDemo() {
  const handleResetWelcome = () => {
    resetWelcomeAnimation()
  }

  return (
    <Card className="max-w-md mx-auto m-8">
      <CardHeader>
        <CardTitle className="text-center">🎉 Welcome Animation Demo</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-gray-600">
          Click the button below to reset the welcome animation and see it again.
        </p>
        <Button 
          onClick={handleResetWelcome}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Reset & Show Welcome Animation
        </Button>
        <div className="text-xs text-gray-500 space-y-1">
          <p>Or use keyboard shortcut: <kbd className="bg-gray-100 px-1 rounded">Ctrl+Shift+W</kbd></p>
          <p>Or run in console: <code className="bg-gray-100 px-1 rounded">resetWelcome()</code></p>
        </div>
      </CardContent>
    </Card>
  )
}
