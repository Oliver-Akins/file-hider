# File Hider

This is a plugin for [Obsidian](https://obsidian.md) that allows hiding specific
files and folders from the file explorer.

## How to Use
Right Click on any file or folder that you want to hide, and click `Hide Folder`
or `Hide File`. This will hide the file by default.

### Showing Hidden Files/Folders
You can toggle the visibility status of the files and folders by running the
`File Hider: Toggle Visibility` command.

### Removing File/Folder's Hidden Status

#### Right Click on Shown File
If you right click on a file that is set to be hidden, when it is shown in the
list, you will see an `Unhide File` option, clicking that will remove it from
the list of hidden files and keep it visible once hidden files are no longer
visible.

#### File/Folder List
- Open Obsidian's settings
- Go to the `File Hider` tab
- Click on either `Manage File List` or `Manage Folder List` to open a list of all hidden files/folders.
- Click on the `X` button of the file/folder you no longer want hidden.


### Ribbon Icon
If you want an icon in the ribbon sidebar, I would recommend using
[Customizable Sidebar](https://github.com/phibr0/obsidian-customizable-sidebar)
and adding the `File Hider: Toggle Visibility` command.