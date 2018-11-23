# CHANGELOG
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- MonoBehaviour messages:
	* OnParticleSystemStopped()
- StateMachineBehaviour messages:
	* OnStateEnter()
	* OnStateExit()
	* OnStateIK()
	* OnStateMove()
	* OnStateUpdate()
- Editor messages:
	* OnSceneGUI()
- EditorWindow messages:
	* OnFocus()
	* OnHierarchyChange()
	* OnInspectorUpdate()
	* OnLostFocus()
	* OnProjectChange()
	* OnSelectionChange()
- ScriptableWizard messages:
	* OnWizardCreate()
	* OnWizardOtherButton()
	* OnWizardUpdate()
- Debug methods:
	* Debug.LogFormat()
	* Debug.LogErrorFormat()
	* Debug.LogWarningFormat()
- General class and interface using file name
- EditorWindow title
- Editow with Reorderable List now uses EditorGUI.PropertyField

## [1.2.2] - 2018-07-23
### Added
- New snippet: Editor with Reorderable List. Creates an editor boilerplate code with a reorderable list ready to be used.

## [1.2.1] - 2018-06-08
### Changed
- Icon updated to be more visible at extensions panel inside VSCode
- Readme updated: added a new usage gif - ScriptableObject

### Fixed
- Added private modifier to FixedUpdate method


## [1.1.0] - 2017-11-17
### Fixed
- Removed useless "using UnityEditor" inside ScriptableObject


## [1.0.0] - 2017-10-10
- :tada: Initial release


[Unreleased]: https://github.com/kleber-swf/vscode-unity-code-snippets/tree/master
[1.2.1]: https://github.com/kleber-swf/vscode-unity-code-snippets/tree/v1.2.1
[1.1.0]: https://github.com/kleber-swf/vscode-unity-code-snippets/tree/v1.1.0
[1.0.0]: https://github.com/kleber-swf/vscode-unity-code-snippets/tree/v1.0.0