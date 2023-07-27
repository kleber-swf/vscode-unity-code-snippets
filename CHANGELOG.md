# CHANGELOG

All notable changes to this project will be documented in this file.

_The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html)._

## [2.1.0] - 2023-06-27

### Added:

-  New configuration: `private` accessor keyword for private members now is optional.

## [2.0.0] - 2023-06-27

### Added

-  🎉 **Configurable indentation style** 🎉. The long waited Allman style is here! Better than that, you can configure your indentation style with [K&R](https://en.wikipedia.org/wiki/Indentation_style#K&R_style) (default) or [Allman](https://en.wikipedia.org/wiki/Indentation_style#Allman_style) (Unity/C# default). K&R was kept as default due the 1.x behavior.
-  New snippets:
   -  `[SerializeField]`. Suggested by [@Ferhattepe](https://github.com/Ferhattepe)
   -  `[RequireComponent]`. Suggested by [@lgarczyn](https://github.com/lgarczyn)

### Changed

-  Removed parentheses from `MonoBehaviour` prefixes. Suggested by [@zoosewu](https://github.com/zoosewu)

## [1.3.0] - 2018-11-18

### Added

-  MonoBehaviour messages:
   -  `OnParticleSystemStopped()`
-  StateMachineBehaviour messages:
   -  `OnStateEnter()`
   -  `OnStateExit()`
   -  `OnStateIK()`
   -  `OnStateMove()`
   -  `OnStateUpdate()`
-  Editor messages:
   -  `OnSceneGUI()`
-  EditorWindow messages:
   -  `OnFocus()`
   -  `OnHierarchyChange()`
   -  `OnInspectorUpdate()`
   -  `OnLostFocus()`
   -  `OnProjectChange()`
   -  `OnSelectionChange()`
-  ScriptableWizard messages:
   -  `OnWizardCreate()`
   -  `OnWizardOtherButton()`
   -  `OnWizardUpdate()`
-  Debug methods:
   -  `Debug.LogFormat()`
   -  `Debug.LogErrorFormat()`
   -  `Debug.LogWarningFormat()`
-  General class and interface using file name

### Changed

-  `EditorWindow.title`
-  `Editor` with `ReorderableList` now uses `EditorGUI.PropertyField`

## [1.2.2] - 2018-07-23

### Added

-  New snippet: Editor with Reorderable List. Creates an editor boilerplate code with a reorderable list ready to be used.

## [1.2.1] - 2018-06-08

### Changed

-  Icon updated to be more visible at extensions panel inside VSCode
-  Readme updated: added a new usage gif - `ScriptableObject`

### Fixed

-  Added private modifier to `FixedUpdate` method

## [1.1.0] - 2017-11-17

### Fixed

-  Removed useless `using UnityEditor` inside `ScriptableObject`

## [1.0.0] - 2017-10-10

-  :tada: Initial release

[Unreleased]: https://github.com/kleber-swf/vscode-unity-code-snippets/tree/master
[2.0.1]: https://github.com/kleber-swf/vscode-unity-code-snippets/tree/v2.0.1
[2.0.0]: https://github.com/kleber-swf/vscode-unity-code-snippets/tree/v2.0.0
[1.3.0]: https://github.com/kleber-swf/vscode-unity-code-snippets/tree/v1.3.0
[1.2.2]: https://github.com/kleber-swf/vscode-unity-code-snippets/tree/v1.2.2
[1.2.1]: https://github.com/kleber-swf/vscode-unity-code-snippets/tree/v1.2.1
[1.1.0]: https://github.com/kleber-swf/vscode-unity-code-snippets/tree/v1.1.0
[1.0.0]: https://github.com/kleber-swf/vscode-unity-code-snippets/tree/v1.0.0
