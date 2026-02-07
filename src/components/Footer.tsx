export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">DigiWorks Solutions</h3>
            <p className="text-muted-foreground text-sm font-is">Fast, free, and secure image conversion tool</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-dm">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-is">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Features
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 font-dm">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground font-is">
              <li>
                <a href="#" className="hover:text-foreground transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground font-is">
          <p>&copy; 2025 DigiWorks Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}