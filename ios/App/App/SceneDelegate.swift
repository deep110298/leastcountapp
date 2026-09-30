import UIKit
import Capacitor

class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?
    private var bridgeViewController: CAPBridgeViewController?
    private var universalLinkObserver: NSObjectProtocol?

    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options connectionOptions: UIScene.ConnectionOptions) {
        guard let windowScene = scene as? UIWindowScene else { return }

        let viewController = CAPBridgeViewController()
        bridgeViewController = viewController

        window = UIWindow(windowScene: windowScene)
        window?.rootViewController = viewController
        window?.makeKeyAndVisible()

        // Capacitor's own bridge only records a tapped Universal Link and
        // posts capacitorSceneOpenUniversalLink about it — with server.url
        // configured (this app loads leastcountapp.com live, not a bundled
        // index.html), nothing makes the webview actually navigate to the
        // tapped path on its own. Without this, a shared room link opens the
        // app but the webview just loads its default root, landing on the
        // home screen instead of the room. One observer here covers both a
        // cold launch (link tapped with the app fully closed, delivered once
        // the bridge is ready) and a warm resume (link tapped while already
        // running) — Capacitor posts the same notification either way.
        universalLinkObserver = NotificationCenter.default.addObserver(
            forName: .capacitorSceneOpenUniversalLink,
            object: nil,
            queue: .main
        ) { [weak self] notification in
            guard let url = notification.userInfo?["url"] as? URL else { return }
            self?.bridgeViewController?.webView?.load(URLRequest(url: url))
        }

        SceneDelegateProxy.shared.scene(scene, willConnectTo: session, options: connectionOptions)
    }

    func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
        SceneDelegateProxy.shared.scene(scene, openURLContexts: URLContexts)
    }

    func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
        SceneDelegateProxy.shared.scene(scene, continue: userActivity)
    }
}
