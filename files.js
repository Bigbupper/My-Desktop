document.addEventListener('DOMContentLoaded', function () {
    /* -------files window------- */

    /* file system data */
    const fileSystem = [
        {
            type: 'folder',
            name: 'Bean Photos',
            files: [
                { name: 'Bean', src: 'media/files/files-photos/bean1.jpeg', type: 'image' },
                { name: 'Bean 2', src: 'media/files/files-photos/bean2.jpeg', type: 'image' },
                { name: 'Bean 3', src: 'media/files/files-photos/bean3.jpeg', type: 'image' },
                { name: 'Bean 4', src: 'media/files/files-photos/bean4.jpeg', type: 'image' },
                { name: 'Bean 5', src: 'media/files/files-photos/bean5.jpeg', type: 'image' },
                { name: 'Bean 6', src: 'media/files/files-photos/bean6.jpeg', type: 'image' },
                { name: 'Bean 7', src: 'media/files/files-photos/bean7.jpeg', type: 'image' },
                { name: 'Bean 8', src: 'media/files/files-photos/bean8.jpeg', type: 'image' },
                { name: 'Bean 9', src: 'media/files/files-photos/bean9.jpeg', type: 'image' },
            ]
        },
        {
            type: 'folder',
            name: 'Wallpapers',
            files: [
                { name: 'teddy-dark',   src: 'media/dark-bg.png',    type: 'image' },
                { name: 'teddy-light', src: 'media/light-bg.jpg', type: 'image' },
                { name: 'kirby-wallpaper', src: 'files-window-assets/kirby-2k-wallpaper-uhdpaper.com-799@0@i.jpg', type: 'image' },
            ]
        },
        
    ];


    /* state */
    let currentFolder = null;


    /* elements */
    const fileContainer  = document.getElementById('file-container');
    const breadcrumb     = document.getElementById('files-breadcrumb');
    const backButton     = document.getElementById('files-back-button');


    /* render functions */

    // renders the top-level folder list
    function renderFolders() {
        currentFolder = null;
        fileContainer.innerHTML = '';
        breadcrumb.textContent = 'Files';
        backButton.style.display = 'none';

        fileSystem.forEach(folder => {
            const folderIcon = createFolderIcon(folder);
            fileContainer.appendChild(folderIcon);
        });
    }

    // renders the contents of a clicked folder
    function renderFiles(folder) {
        currentFolder = folder;
        fileContainer.innerHTML = '';
        breadcrumb.textContent = `Files / ${folder.name}`;
        backButton.style.display = 'inline-block';

        if (folder.files.length === 0) {
            const empty = document.createElement('p');
            empty.textContent = 'This folder is empty.';
            empty.classList.add('files-empty-label');
            fileContainer.appendChild(empty);
            return;
        }

        folder.files.forEach(file => {
            const fileIcon = createFileIcon(file);
            fileContainer.appendChild(fileIcon);
        });
    }

    // builds a folder icon element
    function createFolderIcon(folder) {
        const icon = document.createElement('div');
        icon.classList.add('file-icon');

        // folder image container
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('file-image-container');

        const img = document.createElement('img');
        img.src = 'media/folder.png';
        img.alt = folder.name;

        imageContainer.appendChild(img);

        // folder label
        const label = document.createElement('p');
        label.classList.add('file-label');
        label.textContent = folder.name;

        icon.appendChild(imageContainer);
        icon.appendChild(label);

        // open folder on double-click
        icon.addEventListener('dblclick', () => {
            renderFiles(folder);
        });

        return icon;
    }

    // builds a file icon element
    function createFileIcon(file) {
        const icon = document.createElement('div');
        icon.classList.add('file-icon');

        // image container + thumbnail
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('file-image-container');

        const img = document.createElement('img');
        img.src = file.src;
        img.alt = file.name;

        imageContainer.appendChild(img);

        // file label
        const label = document.createElement('p');
        label.classList.add('file-label');
        label.textContent = file.name;

        icon.appendChild(imageContainer);
        icon.appendChild(label);

        return icon;
    }


    /* ----- navigation ----- */

    // back button returns to folder list
    backButton.addEventListener('click', () => {
        renderFolders();
    });


    /* ----- search ----- */

    const searchInput = document.querySelector('.files-search');

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.trim().toLowerCase();

        if (query === '') {
            // restore normal view when search is cleared
            if (currentFolder) {
                renderFiles(currentFolder);
            } else {
                renderFolders();
            }
            return;
        }

        // search functionality
        fileContainer.innerHTML = '';
        backButton.style.display = 'none';
        breadcrumb.textContent = `Search: "${query}"`;

        let resultsFound = false;

        fileSystem.forEach(folder => {
            folder.files.forEach(file => {
                if (file.name.toLowerCase().includes(query)) {
                    const fileIcon = createFileIcon(file);
                    fileContainer.appendChild(fileIcon);
                    resultsFound = true;
                }
            });
        });

        if (!resultsFound) {
            const empty = document.createElement('p');
            empty.textContent = 'No files found.';
            empty.classList.add('files-empty-label');
            fileContainer.appendChild(empty);
        }
    });


    /* ----- init ----- */
    renderFolders();
});