export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4 text-center md:px-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} GearShare Marketplace. Built for the community.
        </p>
      </div>
    </footer>
  );
}
