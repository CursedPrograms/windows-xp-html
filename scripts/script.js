
document.addEventListener('DOMContentLoaded', (event) => {
    const startButton = document.getElementById('start-button');
    const startMenu = document.getElementById('start-menu');
    const desktop = document.getElementById('desktop');
    const gameWindow = document.getElementById('game-window');
    const gameTitle = document.getElementById('game-title');
    const gameContent = document.getElementById('game-content');
    const recycleBinWindow = document.getElementById('recycle-bin-window');
    const recycleBinContent = document.getElementById('recycle-bin-content');
    const myComputerWindow = document.getElementById('my-computer-window');
    const myComputerContent = document.getElementById('my-computer-content');
    const ieWindow = document.getElementById('ie-window');
    const contextMenu = document.getElementById('context-menu');
    const deleteMenuItem = document.getElementById('delete-item');
  
    let activeIcon = null;
    let recycleBinItems = [];
  
    startButton.addEventListener('click', () => {
      startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
    });
  
    desktop.addEventListener('click', (e) => {
      if (!e.target.closest('#start-menu') && !e.target.closest('#start-button')) {
        startMenu.style.display = 'none';
      }
  
      if (e.target.closest('.icon')) {
        const icon = e.target.closest('.icon');
        if (activeIcon) {
          activeIcon.style.backgroundColor = 'transparent';
        }
        icon.style.backgroundColor = 'rgba(0, 0, 255, 0.3)';
        activeIcon = icon;
      } else {
        if (activeIcon) {
          activeIcon.style.backgroundColor = 'transparent';
          activeIcon = null;
        }
      }
  
      contextMenu.style.display = 'none';
    });
  
    desktop.addEventListener('dblclick', (e) => {
      if (e.target.closest('.icon')) {
        const iconName = e.target.closest('.icon').dataset.name;
        openWindow(iconName);
      }
    });
  
    desktop.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      if (e.target.closest('.icon')) {
        activeIcon = e.target.closest('.icon');
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.style.display = 'block';
      }
    });
  
    deleteMenuItem.addEventListener('click', () => {
      if (activeIcon) {
        const iconName = activeIcon.dataset.name;
        if (iconName !== 'Recycle Bin' && iconName !== 'My Computer' && iconName !== 'Internet Explorer') {
          recycleBinItems.push(iconName);
          activeIcon.remove();
          updateRecycleBin();
        }
      }
      contextMenu.style.display = 'none';
    });
  
    startMenu.addEventListener('click', (e) => {
      if (e.target.classList.contains('start-item')) {
        const game = e.target.dataset.game;
        gameTitle.textContent = e.target.textContent;
        gameContent.textContent = `This is where ${e.target.textContent} would be implemented.`;
        gameWindow.style.display = 'flex';
        startMenu.style.display = 'none';
      }
    });
  
    function openWindow(name) {
      switch (name) {
        case 'Recycle Bin':
          recycleBinWindow.style.display = 'flex';
          updateRecycleBin();
          break;
        case 'My Computer':
          myComputerWindow.style.display = 'flex';
          updateMyComputer();
          break;
        case 'Internet Explorer':
          ieWindow.style.display = 'flex';
          break;
        default:
          alert(`Opening ${name}`);
      }
    }
  
    function updateRecycleBin() {
      recycleBinContent.innerHTML = '';
      recycleBinItems.forEach(item => {
        const deletedItem = document.createElement('div');
        deletedItem.className = 'deleted-item';
        deletedItem.innerHTML = `
          <img src="https://win98icons.alexmeub.com/icons/png/file_deleted-1.png" alt="Deleted file icon" width="32" height="32">
          <span>${item}</span>
        `;
        recycleBinContent.appendChild(deletedItem);
      });
    }
  
    function updateMyComputer() {
      myComputerContent.innerHTML = '';
      const drives = ['C:', 'D:'];
      drives.forEach(drive => {
        const driveElement = document.createElement('div');
        driveElement.className = 'drive';
        driveElement.innerHTML = `
          <img src="https://win98icons.alexmeub.com/icons/png/hard_disk_drive-4.png" alt="Hard drive icon" width="48" height="48">
          <span>${drive}</span>
        `;
        myComputerContent.appendChild(driveElement);
      });
    }
  
    document.querySelectorAll('.close-button').forEach(button => {
      button.addEventListener('click', () => {
        button.closest('.window').style.display = 'none';
      });
    });
  
    // Make windows draggable
    const windows = document.querySelectorAll('.window');
    windows.forEach(makeWindowDraggable);
  
    function makeWindowDraggable(element) {
      let isDragging = false;
      let currentX;
      let currentY;
      let initialX;
      let initialY;
      let xOffset = 0;
      let yOffset = 0;
  
      element.addEventListener("mousedown", dragStart);
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", dragEnd);
  
      function dragStart(e) {
        if (e.target === element || e.target.closest('.title-bar')) {
          initialX = e.clientX - xOffset;
          initialY = e.clientY - yOffset;
          isDragging = true;
        }
      }
  
      function drag(e) {
        if (isDragging) {
          e.preventDefault();
          currentX = e.clientX - initialX;
          currentY = e.clientY - initialY;
          xOffset = currentX;
          yOffset = currentY;
          setTranslate(currentX, currentY, element);
        }
      }
  
      function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(${xPos}px, ${yPos}px)`;
      }
  
      function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
      }
    }
  });