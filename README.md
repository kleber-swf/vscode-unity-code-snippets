# Unity Code Snippets

Create Unity classes and methods easily.

![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/kleber-swf.unity-code-snippets?color=red&style=for-the-badge)
![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/kleber-swf.unity-code-snippets?color=blue&style=for-the-badge)
![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/kleber-swf.unity-code-snippets?color=orange&style=for-the-badge)

## Features

> **2.0.0**: Support to style configuration. Now you can use [K&R](https://en.wikipedia.org/wiki/Indentation_style#K&R_style) and [Allman (C#/Unity default)](https://en.wikipedia.org/wiki/Indentation_style#Allman_style) styles! More at [Configuration](#configuration) section.

All the Unity code snippets you need. This extension intends to be the complete collection of Unity snippets for Visual Studio Code.

It takes advantage of latest Visual Studio Code snippets features to create the code faster for you.

### MonoBehaviour

Create game classes like `MonoBehaviours`, `NetworkBehaviours` and `StateMachineBehaviours` easily. Also create common methods like `Start()`, `Update()` or `OnTriggerEnter2D()` and log calls.

![MonoBehaviour](https://raw.githubusercontent.com/kleber-swf/vscode-unity-code-snippets/master/images/doc/usage-01.gif)

### Editor

Create Editor classes like `Editor`, `EditorWindow` and `PropertyDrawer` as easy as it can be.

![Unity Editor](https://raw.githubusercontent.com/kleber-swf/vscode-unity-code-snippets/master/images/doc/usage-02.gif)

### ScriptableObject

You never remember the property that goes with the `ScriptableObject` to create it via Unity create menu? Not a problem.

![ScriptableObject](https://raw.githubusercontent.com/kleber-swf/vscode-unity-code-snippets/master/images/doc/usage-03.gif)

## Installation

As in any Visual Studio Code Extension you have several options to install:

-  Enter the Visual Studio Code Marketplace, search for _Unity Code Snippets_ (or enter directly on [the extension page](https://marketplace.visualstudio.com/items?itemName=kleber-swf.unity-code-snippets)) and click on _Install_ button.
-  Inside Visual Studio Code, enter in the Extensios panel, search for _Unity Code Snippets_ and click on _Install_ button
-  Run the following command in the Command Palette:
   ```
   ext install kleber-swf.unity-code-snippets
   ```

## Configuration

Starting at version `2.0.0` the extension is configurable.

To configure the extension, open VSCode Settings and search for "Unity Code Snippets". Note that after changing any of the settings, you need to restart VSCode to apply them to the snippets.

Available options:

-  **Style**: The [indentation style](https://en.wikipedia.org/wiki/Indentation_style) for the snippets. For now you can choose between [K&R](https://en.wikipedia.org/wiki/Indentation_style#K&R_style) (the default for 1.x version) and [Allman](https://en.wikipedia.org/wiki/Indentation_style#Allman_style) (default to C#/Unity). If you need a different one, please leave an issue or upvote an existing one at the [project issues bord](https://github.com/kleber-swf/vscode-unity-code-snippets/issues). Default: `K&R`.

   **K&R style**
   ![K&R Indentation style](./images/doc/kr.png)

   **Allman style**
   ![Allman Indentation style](./images/doc/allman.png)

-  **Use Private Keyword**: Adds the `private` accessor keyword to private members. Default: `true`.

   **No private keyword**
   ![No private keyword](./images/doc/no-private.png)

## All the snippets

Start typing the names to create the corresponding snippets.

-  Game classes:

   -  `MonoBehaviour`
   -  `StateMachineBehaviour`
   -  `NetworkBehaviour`
   -  `ScriptableObject`

-  Editor Classes:

   -  `Editor`
   -  `Editor` with `Reorderable List`
   -  `EditorWindow`
   -  `PropertyDrawer`
   -  `ScriptableWizard`

-  MonoBehaviour Methods:

   -  `Awake()`
   -  `FixedUpdate()`
   -  `LateUpdate()`
   -  `OnAnimatorIK()`
   -  `OnAnimatorMove()`
   -  `OnApplicationFocus()`
   -  `OnApplicationPause()`
   -  `OnApplicationQuit()`
   -  `OnAudioFilterRead()`
   -  `OnBecameInvisible()`
   -  `OnBecameVisible()`
   -  `OnCollisionEnter()`
   -  `OnCollisionEnter2D()`
   -  `OnCollisionExit()`
   -  `OnCollisionExit2D()`
   -  `OnCollisionStay()`
   -  `OnCollisionStay2D()`
   -  `OnConnectedToServer()`
   -  `OnControllerColliderHit()`
   -  `OnDestroy()`
   -  `OnDisable()`
   -  `OnDisconnectedFromServer()`
   -  `OnDrawGizmos()`
   -  `OnDrawGizmosSelected()`
   -  `OnEnable()`
   -  `OnFailedToConnect()`
   -  `OnFailedToConnectToMasterServer()`
   -  `OnGUI()`
   -  `OnJointBreak()`
   -  `OnJointBreak2D()`
   -  `OnMasterServerEvent()`
   -  `OnMouseDown()`
   -  `OnMouseDrag()`
   -  `OnMouseEnter()`
   -  `OnMouseExit()`
   -  `OnMouseOver()`
   -  `OnMouseUp()`
   -  `OnMouseUpAsButton()`
   -  `OnNetworkInstantiate()`
   -  `OnParticleCollision()`
   -  `OnParticleTrigger()`
   -  `OnPlayerConnected()`
   -  `OnPlayerDisconnected()`
   -  `OnPostRender()`
   -  `OnPreCull()`
   -  `OnPreRender()`
   -  `OnRenderImage()`
   -  `OnRenderObject()`
   -  `OnSerializeNetworkView()`
   -  `OnServerInitialized()`
   -  `OnTransformChildrenChanged()`
   -  `OnTransformParentChanged()`
   -  `OnTriggerEnter()`
   -  `OnTriggerEnter2D()`
   -  `OnTriggerExit()`
   -  `OnTriggerExit2D()`
   -  `OnTriggerStay()`
   -  `OnTriggerStay2D()`
   -  `OnValidate()`
   -  `OnWillRenderObject()`
   -  `Reset()`
   -  `Start()`
   -  `Update()`

-  Debug class:

   -  `Debug.DrawLine()`
   -  `Debug.DrawRay()`

-  Some useful code snippets:
   -  `Debug.Log()` (type _`log`_)
   -  `Debug.LogError()` (type _`logerror`_)
   -  `Debug.LogWarning()` (type _`logwarning`_)
   -  `Debug.LogException()` (type _`logexception`_)
   -  `[SerializeField]`
   -  `[RequireComponent]`
   -  Standard `class`
   -  Standard `interface`

If you have any suggestion, please don't give the extension a bad review. Instead, [open an issue in the Github project](https://github.com/kleber-swf/vscode-unity-code-snippets/issues) page and I'll try to add it when/if possible.

If you like the color theme of the previews, you can download it here: [Base16 Ocean Dark Extended Theme](https://marketplace.visualstudio.com/items?itemName=kleber-swf.ocean-dark-extended).

Thank you for downloading this extension.

If you like the extension, please rate it with 5⭐. And, if you are feeling especially kind today, also leave a kind comment: [Review this Extension](https://marketplace.visualstudio.com/items?itemName=kleber-swf.unity-code-snippets&ssr=false#review-details).
