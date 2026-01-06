export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Disclaimer */}
          <div>
            <h3 className="font-semibold text-white mb-3">Disclaimer</h3>
            <p className="text-sm leading-relaxed">
              This is an unofficial fan site for Roblox Devil Hunter. We are not
              affiliated with Roblox Corporation or the official game developers.
              All game content is the property of their respective owners.
            </p>
          </div>

          {/* Compliance Notice */}
          <div>
            <h3 className="font-semibold text-white mb-3">Safety & Compliance</h3>
            <p className="text-sm leading-relaxed">
              We do <strong>not</strong> support or provide cheating tools, exploits,
              scripts, or methods to bypass game mechanics. Such activities violate
              Roblox Terms of Service and can result in account termination. Play fairly
              and report violations to{' '}
              <a
                href="https://en.help.roblox.com/hc/en-us/articles/203312410"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Roblox Support
              </a>
              .
            </p>
          </div>
        </div>

        {/* External Links Notice */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-xs text-gray-400">
            External links are not controlled by this site. We are not responsible for
            the content of external sites. All links open in new tabs with security
            measures enabled.
          </p>
          <p className="text-xs text-gray-400 mt-4">
            © 2026 Devil Hunter Hub. Unofficial fan site.
          </p>
        </div>
      </div>
    </footer>
  );
}
