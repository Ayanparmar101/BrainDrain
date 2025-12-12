// 3D CNC Machine Simulator
// Using Three.js for realistic 3D visualization

class CNCSimulator3D {
    constructor() {
        // Scene setup
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        
        // Machine parts
        this.machine = null;
        this.spindle = null;
        this.toolBit = null;
        this.workpiece = null;
        this.workpieceMaterial = null;
        this.table = null;
        this.gantry = null;
        this.xCarriage = null;
        this.zCarriage = null;
        
        // Cutting visualization - using a height map approach
        this.cutCanvas = null;
        this.cutContext = null;
        this.cutTexture = null;
        this.heightData = null;
        this.cutTrailMesh = null;
        this.cutTrailPoints = [];
        
        // Particles
        this.particles = [];
        this.pathLine = null;
        
        // Cut piece that will be elevated
        this.cutPieceMesh = null;
        this.isElevating = false;
        this.elevationProgress = 0;
        
        // Cavity meshes (hole left after cut piece is removed)
        this.cavityFloor = null;
        this.cavityWalls = null;
        
        // State
        this.selectedShape = 'circle';
        this.speed = 50;
        this.cutDepth = 5;
        this.shapeSize = 60;
        this.isRunning = false;
        this.isPaused = false;
        this.progress = 0;
        this.currentPathIndex = 0;
        this.cutPath = [];
        
        // Animation
        this.animationId = null;
        this.spindleRotation = 0;
        
        // Workpiece dimensions (in scene units)
        this.workpieceSize = { x: 12, y: 1.5, z: 12 };
        this.heightMapResolution = 512;
        
        this.init();
    }
    
    init() {
        this.setupScene();
        this.setupLights();
        this.createMachine();
        this.createWorkpiece();
        this.setupEventListeners();
        this.animate();
        
        // Hide loading overlay
        setTimeout(() => {
            document.getElementById('loadingOverlay').classList.add('hidden');
        }, 1000);
    }
    
    setupScene() {
        const container = document.getElementById('canvas-container');
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        this.scene.fog = new THREE.Fog(0x1a1a2e, 30, 80);
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        this.camera.position.set(20, 15, 20);
        this.camera.lookAt(0, 0, 0);
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        container.appendChild(this.renderer.domElement);
        
        // Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 10;
        this.controls.maxDistance = 50;
        this.controls.maxPolarAngle = Math.PI / 2;
        
        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Add grid
        const gridHelper = new THREE.GridHelper(40, 40, 0x444466, 0x333355);
        gridHelper.position.y = -0.01;
        this.scene.add(gridHelper);
        
        // Ground plane
        const groundGeometry = new THREE.PlaneGeometry(50, 50);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x222233,
            roughness: 0.9,
            metalness: 0.1
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -0.02;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }
    
    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
        this.scene.add(ambientLight);
        
        // Main directional light
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(10, 20, 10);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 1;
        mainLight.shadow.camera.far = 50;
        mainLight.shadow.camera.left = -20;
        mainLight.shadow.camera.right = 20;
        mainLight.shadow.camera.top = 20;
        mainLight.shadow.camera.bottom = -20;
        this.scene.add(mainLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0x6366f1, 0.3);
        fillLight.position.set(-10, 10, -10);
        this.scene.add(fillLight);
        
        // Spot light for dramatic effect
        const spotLight = new THREE.SpotLight(0x10b981, 0.5);
        spotLight.position.set(0, 15, 0);
        spotLight.angle = Math.PI / 4;
        spotLight.penumbra = 0.5;
        this.scene.add(spotLight);
    }
    
    createMachine() {
        this.machine = new THREE.Group();
        
        // Materials
        const frameMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x2d3748, 
            roughness: 0.3,
            metalness: 0.8 
        });
        const accentMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x6366f1, 
            roughness: 0.4,
            metalness: 0.6 
        });
        const metalMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x94a3b8, 
            roughness: 0.2,
            metalness: 0.9 
        });
        
        // Base/Table
        const baseGeometry = new THREE.BoxGeometry(18, 0.8, 18);
        this.table = new THREE.Mesh(baseGeometry, frameMaterial);
        this.table.position.y = -0.4;
        this.table.castShadow = true;
        this.table.receiveShadow = true;
        this.machine.add(this.table);
        
        // Table top accent
        const tableTopGeometry = new THREE.BoxGeometry(17, 0.1, 17);
        const tableTopMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1e293b, 
            roughness: 0.5,
            metalness: 0.3 
        });
        const tableTop = new THREE.Mesh(tableTopGeometry, tableTopMaterial);
        tableTop.position.y = 0.05;
        tableTop.receiveShadow = true;
        this.machine.add(tableTop);
        
        // Left pillar
        const pillarGeometry = new THREE.BoxGeometry(1.2, 12, 1.2);
        const leftPillar = new THREE.Mesh(pillarGeometry, frameMaterial);
        leftPillar.position.set(-8, 6, 0);
        leftPillar.castShadow = true;
        this.machine.add(leftPillar);
        
        // Right pillar
        const rightPillar = new THREE.Mesh(pillarGeometry, frameMaterial);
        rightPillar.position.set(8, 6, 0);
        rightPillar.castShadow = true;
        this.machine.add(rightPillar);
        
        // Gantry (moves along Y axis - actually Z in this orientation)
        this.gantry = new THREE.Group();
        
        const gantryBeamGeometry = new THREE.BoxGeometry(17.5, 1.5, 1.5);
        const gantryBeam = new THREE.Mesh(gantryBeamGeometry, frameMaterial);
        gantryBeam.position.y = 10;
        gantryBeam.castShadow = true;
        this.gantry.add(gantryBeam);
        
        // Gantry accent strips
        const stripGeometry = new THREE.BoxGeometry(17.6, 0.2, 0.2);
        const strip1 = new THREE.Mesh(stripGeometry, accentMaterial);
        strip1.position.set(0, 10.7, 0.7);
        this.gantry.add(strip1);
        const strip2 = new THREE.Mesh(stripGeometry, accentMaterial);
        strip2.position.set(0, 9.3, 0.7);
        this.gantry.add(strip2);
        
        this.machine.add(this.gantry);
        
        // X Carriage (moves along X axis on gantry)
        this.xCarriage = new THREE.Group();
        
        const carriageGeometry = new THREE.BoxGeometry(2.5, 2.5, 2);
        const carriage = new THREE.Mesh(carriageGeometry, frameMaterial);
        carriage.castShadow = true;
        this.xCarriage.add(carriage);
        
        // Carriage accent
        const carriageAccentGeometry = new THREE.BoxGeometry(2.6, 0.3, 2.1);
        const carriageAccent = new THREE.Mesh(carriageAccentGeometry, accentMaterial);
        carriageAccent.position.y = 1;
        this.xCarriage.add(carriageAccent);
        
        this.xCarriage.position.set(0, 10, 1.5);
        this.machine.add(this.xCarriage);
        
        // Z Carriage (moves up/down)
        this.zCarriage = new THREE.Group();
        
        const zCarriageGeometry = new THREE.BoxGeometry(1.8, 3.5, 1.8);
        const zCarriageMesh = new THREE.Mesh(zCarriageGeometry, frameMaterial);
        zCarriageMesh.castShadow = true;
        this.zCarriage.add(zCarriageMesh);
        
        this.zCarriage.position.set(0, -2, 0.5);
        this.xCarriage.add(this.zCarriage);
        
        // Spindle housing
        const spindleHousingGeometry = new THREE.CylinderGeometry(0.8, 0.6, 3, 32);
        const spindleHousing = new THREE.Mesh(spindleHousingGeometry, metalMaterial);
        spindleHousing.position.y = -3;
        spindleHousing.castShadow = true;
        this.zCarriage.add(spindleHousing);
        
        // Spindle (rotates)
        this.spindle = new THREE.Group();
        
        const spindleShaftGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 32);
        const spindleShaft = new THREE.Mesh(spindleShaftGeometry, metalMaterial);
        spindleShaft.position.y = -0.75;
        this.spindle.add(spindleShaft);
        
        // Collet
        const colletGeometry = new THREE.CylinderGeometry(0.25, 0.15, 0.5, 32);
        const collet = new THREE.Mesh(colletGeometry, metalMaterial);
        collet.position.y = -1.75;
        this.spindle.add(collet);
        
        // Tool bit (end mill)
        const toolBitGeometry = new THREE.CylinderGeometry(0.12, 0.12, 2, 16);
        const toolBitMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xc0c0c0, 
            roughness: 0.1,
            metalness: 1 
        });
        this.toolBit = new THREE.Mesh(toolBitGeometry, toolBitMaterial);
        this.toolBit.position.y = -2.8;
        this.spindle.add(this.toolBit);
        
        // Tool tip
        const toolTipGeometry = new THREE.ConeGeometry(0.12, 0.3, 16);
        const toolTip = new THREE.Mesh(toolTipGeometry, toolBitMaterial);
        toolTip.position.y = -3.95;
        toolTip.rotation.x = Math.PI;
        this.spindle.add(toolTip);
        
        this.spindle.position.y = -4.5;
        this.zCarriage.add(this.spindle);
        
        // Spindle light indicator
        const indicatorGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        this.spindleLight = new THREE.Mesh(indicatorGeometry, new THREE.MeshBasicMaterial({ color: 0x666666 }));
        this.spindleLight.position.set(0.7, -2.5, 0);
        this.zCarriage.add(this.spindleLight);
        
        // Control panel on the side
        const panelGeometry = new THREE.BoxGeometry(3, 4, 0.5);
        const panelMaterial = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
        const panel = new THREE.Mesh(panelGeometry, panelMaterial);
        panel.position.set(-9.5, 4, 0);
        panel.rotation.y = Math.PI / 2;
        panel.castShadow = true;
        this.machine.add(panel);
        
        // Panel screen
        const screenGeometry = new THREE.BoxGeometry(2, 2.5, 0.1);
        const screenMaterial = new THREE.MeshBasicMaterial({ color: 0x0f172a });
        const screen = new THREE.Mesh(screenGeometry, screenMaterial);
        screen.position.set(-9.25, 4.5, 0);
        screen.rotation.y = Math.PI / 2;
        this.machine.add(screen);
        
        this.scene.add(this.machine);
    }
    
    createWorkpiece() {
        // Create a canvas for the cut texture (displacement map visualization)
        this.cutCanvas = document.createElement('canvas');
        this.cutCanvas.width = this.heightMapResolution;
        this.cutCanvas.height = this.heightMapResolution;
        this.cutContext = this.cutCanvas.getContext('2d');
        
        // Fill with base color (uncut material)
        this.cutContext.fillStyle = '#d4a574';
        this.cutContext.fillRect(0, 0, this.heightMapResolution, this.heightMapResolution);
        
        // Create texture from canvas
        this.cutTexture = new THREE.CanvasTexture(this.cutCanvas);
        this.cutTexture.needsUpdate = true;
        
        // Create workpiece with the texture
        const geometry = new THREE.BoxGeometry(
            this.workpieceSize.x, 
            this.workpieceSize.y, 
            this.workpieceSize.z,
            1, 1, 1
        );
        
        // Create materials for each face - use texture on top
        const sideMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xc49a6c,
            roughness: 0.7,
            metalness: 0.0
        });
        
        const topMaterial = new THREE.MeshStandardMaterial({ 
            map: this.cutTexture,
            roughness: 0.7,
            metalness: 0.0
        });
        
        // BoxGeometry face order: +X, -X, +Y, -Y, +Z, -Z
        const materials = [
            sideMaterial, // right
            sideMaterial, // left
            topMaterial,  // top - this is where we cut
            sideMaterial, // bottom
            sideMaterial, // front
            sideMaterial  // back
        ];
        
        this.workpiece = new THREE.Mesh(geometry, materials);
        this.workpiece.position.set(0, this.workpieceSize.y / 2, 0);
        this.workpiece.castShadow = true;
        this.workpiece.receiveShadow = true;
        this.scene.add(this.workpiece);
        
        // Add edge lines for better visibility
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8b6914 });
        const wireframe = new THREE.LineSegments(edges, lineMaterial);
        this.workpiece.add(wireframe);
        
        // Create cut trail mesh (3D groove visualization)
        this.createCutTrailMesh();
    }
    
    createCutTrailMesh() {
        // Disabled - no longer creating 3D groove mesh
        // Using texture-only visualization instead
        this.cutTrailMesh = null;
    }
    
    generatePath(shape, sizeFactor) {
        const points = [];
        const size = (this.workpieceSize.x / 2 - 1) * (sizeFactor / 100);
        const centerX = 0;
        const centerZ = 0;
        
        switch(shape) {
            case 'circle':
                for (let angle = 0; angle <= 360; angle += 3) {
                    const rad = (angle * Math.PI) / 180;
                    points.push({
                        x: centerX + Math.cos(rad) * size,
                        z: centerZ + Math.sin(rad) * size
                    });
                }
                break;
                
            case 'square':
                const half = size;
                // Top edge
                for (let i = 0; i <= 25; i++) {
                    points.push({ x: -half + (2 * half * i / 25), z: -half });
                }
                // Right edge
                for (let i = 0; i <= 25; i++) {
                    points.push({ x: half, z: -half + (2 * half * i / 25) });
                }
                // Bottom edge
                for (let i = 0; i <= 25; i++) {
                    points.push({ x: half - (2 * half * i / 25), z: half });
                }
                // Left edge
                for (let i = 0; i <= 25; i++) {
                    points.push({ x: -half, z: half - (2 * half * i / 25) });
                }
                break;
                
            case 'triangle':
                const h = size * 1.2;
                const b = size * 1.2;
                const topY = h * 0.5;
                const bottomY = -h * 0.5;
                
                // Bottom to top-right (flipped)
                for (let i = 0; i <= 33; i++) {
                    points.push({
                        x: centerX + (b / 2) * (i / 33),
                        z: bottomY + (topY - bottomY) * (i / 33)
                    });
                }
                // Top-right to top-left
                for (let i = 0; i <= 33; i++) {
                    points.push({
                        x: centerX + b / 2 - b * (i / 33),
                        z: topY
                    });
                }
                // Top-left to bottom
                for (let i = 0; i <= 33; i++) {
                    points.push({
                        x: centerX - b / 2 + (b / 2) * (i / 33),
                        z: topY - (topY - bottomY) * (i / 33)
                    });
                }
                break;
                
            case 'star':
                const outerRadius = size;
                const innerRadius = size * 0.4;
                const spikes = 5;
                
                for (let i = 0; i <= spikes * 2; i++) {
                    const angle = (i * Math.PI) / spikes - Math.PI / 2;
                    const nextAngle = ((i + 1) * Math.PI) / spikes - Math.PI / 2;
                    const r1 = i % 2 === 0 ? outerRadius : innerRadius;
                    const r2 = (i + 1) % 2 === 0 ? outerRadius : innerRadius;
                    
                    for (let j = 0; j <= 10; j++) {
                        const t = j / 10;
                        const currentAngle = angle + (nextAngle - angle) * t;
                        const currentRadius = r1 + (r2 - r1) * t;
                        points.push({
                            x: centerX + Math.cos(currentAngle) * currentRadius,
                            z: centerZ + Math.sin(currentAngle) * currentRadius
                        });
                    }
                }
                break;
                
            case 'hexagon':
                const hexRadius = size;
                // Create actual hexagon with straight edges (6 vertices)
                for (let i = 0; i <= 6; i++) {
                    const angle = (i * Math.PI * 2) / 6 - Math.PI / 2;
                    const nextAngle = ((i + 1) * Math.PI * 2) / 6 - Math.PI / 2;
                    
                    // Get the two corner vertices
                    const x1 = centerX + Math.cos(angle) * hexRadius;
                    const z1 = centerZ + Math.sin(angle) * hexRadius;
                    const x2 = centerX + Math.cos(nextAngle) * hexRadius;
                    const z2 = centerZ + Math.sin(nextAngle) * hexRadius;
                    
                    // Interpolate along straight edge between vertices
                    for (let j = 0; j <= 16; j++) {
                        const t = j / 16;
                        points.push({
                            x: x1 + (x2 - x1) * t,
                            z: z1 + (z2 - z1) * t
                        });
                    }
                }
                break;
                
            case 'heart':
                for (let t = 0; t <= Math.PI * 2; t += 0.1) {
                    const x = 16 * Math.pow(Math.sin(t), 3);
                    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
                    points.push({
                        x: centerX + x * (size / 18),
                        z: centerZ + y * (size / 18)  // Removed minus sign to flip heart right-side up
                    });
                }
                break;
        }
        
        return points;
    }
    
    setupEventListeners() {
        // Shape buttons
        document.querySelectorAll('.shape-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedShape = btn.dataset.shape;
            });
        });
        
        // Sliders
        document.getElementById('speedSlider').addEventListener('input', (e) => {
            this.speed = parseInt(e.target.value);
            document.getElementById('speedValue').textContent = this.speed + '%';
        });
        
        document.getElementById('depthSlider').addEventListener('input', (e) => {
            this.cutDepth = parseInt(e.target.value);
            document.getElementById('depthValue').textContent = this.cutDepth + 'mm';
        });
        
        document.getElementById('sizeSlider').addEventListener('input', (e) => {
            this.shapeSize = parseInt(e.target.value);
            document.getElementById('sizeValue').textContent = this.shapeSize + '%';
        });
        
        // Control buttons
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        
        // Camera buttons
        document.querySelectorAll('.camera-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.camera-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.setCameraView(btn.dataset.view);
            });
        });
    }
    
    setCameraView(view) {
        const duration = 1000;
        const targetPosition = new THREE.Vector3();
        const targetLookAt = new THREE.Vector3(0, 1, 0);
        
        switch(view) {
            case 'perspective':
                targetPosition.set(20, 15, 20);
                break;
            case 'top':
                targetPosition.set(0, 25, 0.1);
                break;
            case 'front':
                targetPosition.set(0, 8, 25);
                break;
            case 'side':
                targetPosition.set(25, 8, 0);
                break;
        }
        
        // Simple camera animation
        const startPosition = this.camera.position.clone();
        const startTime = Date.now();
        
        const animateCamera = () => {
            const elapsed = Date.now() - startTime;
            const t = Math.min(elapsed / duration, 1);
            const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
            
            this.camera.position.lerpVectors(startPosition, targetPosition, easeT);
            this.camera.lookAt(targetLookAt);
            this.controls.target.copy(targetLookAt);
            
            if (t < 1) {
                requestAnimationFrame(animateCamera);
            }
        };
        
        animateCamera();
    }
    
    start() {
        if (this.isRunning && !this.isPaused) return;
        
        // Only generate new path if not resuming from pause
        if (!this.isPaused) {
            // Reset everything before starting a new cut
            this.resetForNewCut();
            
            // Generate the cutting path
            this.cutPath = this.generatePath(this.selectedShape, this.shapeSize);
            this.currentPathIndex = 0;
            this.cutTrailPoints = [];
            this.drawPathPreview();
        }
        
        this.isRunning = true;
        this.isPaused = false;
        
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        
        const status = document.getElementById('machineStatus');
        status.textContent = 'RUNNING';
        status.className = 'status-value running';
        
        // Turn on spindle light
        this.spindleLight.material.color.setHex(0x22c55e);
        
        // Start the cutting process
        this.runCutting();
    }
    
    pause() {
        this.isPaused = true;
        this.isRunning = false;
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        
        const status = document.getElementById('machineStatus');
        status.textContent = 'PAUSED';
        status.className = 'status-value paused';
        
        // Dim spindle light
        this.spindleLight.material.color.setHex(0xeab308);
    }
    
    reset() {
        this.isRunning = false;
        this.isPaused = false;
        this.progress = 0;
        this.currentPathIndex = 0;
        this.cutPath = [];
        this.cutTrailPoints = [];
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        
        const status = document.getElementById('machineStatus');
        status.textContent = 'IDLE';
        status.className = 'status-value';
        
        document.getElementById('progressValue').textContent = '0%';
        document.getElementById('progressBar').style.width = '0%';
        document.getElementById('xPosition').textContent = '0.00';
        document.getElementById('yPosition').textContent = '0.00';
        document.getElementById('zPosition').textContent = '0.00';
        document.getElementById('spindleRPM').textContent = '0';
        
        // Reset machine position
        this.xCarriage.position.x = 0;
        this.gantry.position.z = 0;
        this.zCarriage.position.y = -2;
        
        // Turn off spindle light
        this.spindleLight.material.color.setHex(0x666666);
        
        // Remove path preview
        if (this.pathLine) {
            this.scene.remove(this.pathLine);
            this.pathLine = null;
        }
        
        // Remove particles
        this.particles.forEach(p => this.scene.remove(p));
        this.particles = [];
        
        // Reset the cut canvas (clear all cuts)
        if (this.cutContext) {
            this.cutContext.fillStyle = '#d4a574';
            this.cutContext.fillRect(0, 0, this.heightMapResolution, this.heightMapResolution);
            this.cutTexture.needsUpdate = true;
        }
        
        // Reset cut trail mesh
        if (this.cutTrailMesh) {
            this.cutTrailMesh.geometry.dispose();
            this.cutTrailMesh.geometry = new THREE.BufferGeometry();
        }
        
        // Remove elevated cut piece
        if (this.cutPieceMesh) {
            this.scene.remove(this.cutPieceMesh);
            this.cutPieceMesh.geometry.dispose();
            this.cutPieceMesh.material.dispose();
            this.cutPieceMesh = null;
        }
        
        // Remove cavity meshes (hole visualization)
        if (this.cavityFloor) {
            this.scene.remove(this.cavityFloor);
            this.cavityFloor.geometry.dispose();
            this.cavityFloor.material.dispose();
            this.cavityFloor = null;
        }
        if (this.cavityWalls) {
            this.scene.remove(this.cavityWalls);
            this.cavityWalls.geometry.dispose();
            this.cavityWalls.material.dispose();
            this.cavityWalls = null;
        }
        
        this.isElevating = false;
        this.elevationProgress = 0;
    }
    
    // Reset only the workpiece and cut visuals (for starting a new cut)
    resetForNewCut() {
        // Remove path preview
        if (this.pathLine) {
            this.scene.remove(this.pathLine);
            this.pathLine = null;
        }
        
        // Remove particles
        this.particles.forEach(p => {
            this.scene.remove(p);
            p.geometry.dispose();
            p.material.dispose();
        });
        this.particles = [];
        
        // Reset the cut canvas (clear all cuts)
        if (this.cutContext) {
            this.cutContext.fillStyle = '#d4a574';
            this.cutContext.fillRect(0, 0, this.heightMapResolution, this.heightMapResolution);
            this.cutTexture.needsUpdate = true;
        }
        
        // Reset cut trail mesh and ensure it's in the scene
        if (this.cutTrailMesh) {
            this.cutTrailMesh.geometry.dispose();
            this.cutTrailMesh.geometry = new THREE.BufferGeometry();
            // Re-add to scene if it was removed during completion
            if (!this.scene.children.includes(this.cutTrailMesh)) {
                this.scene.add(this.cutTrailMesh);
            }
        }
        
        // Remove elevated cut piece
        if (this.cutPieceMesh) {
            this.scene.remove(this.cutPieceMesh);
            this.cutPieceMesh.geometry.dispose();
            this.cutPieceMesh.material.dispose();
            this.cutPieceMesh = null;
        }
        
        // Remove cavity meshes (hole visualization)
        if (this.cavityFloor) {
            this.scene.remove(this.cavityFloor);
            this.cavityFloor.geometry.dispose();
            this.cavityFloor.material.dispose();
            this.cavityFloor = null;
        }
        if (this.cavityWalls) {
            this.scene.remove(this.cavityWalls);
            this.cavityWalls.geometry.dispose();
            this.cavityWalls.material.dispose();
            this.cavityWalls = null;
        }
        
        this.isElevating = false;
        this.elevationProgress = 0;
        
        // Reset cut trail points
        this.cutTrailPoints = [];
    }
    
    drawPathPreview() {
        if (this.pathLine) {
            this.scene.remove(this.pathLine);
        }
        
        const points = this.cutPath.map(p => new THREE.Vector3(p.x, this.workpieceSize.y + 0.5, p.z));
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineDashedMaterial({ 
            color: 0x6366f1, 
            dashSize: 0.3, 
            gapSize: 0.15,
            opacity: 0.7,
            transparent: true
        });
        
        this.pathLine = new THREE.Line(geometry, material);
        this.pathLine.computeLineDistances();
        this.scene.add(this.pathLine);
    }
    
    runCutting() {
        if (!this.isRunning || this.isPaused) return;
        
        const stepsPerFrame = Math.max(1, Math.floor(this.speed / 250)); // 80% slower cutting speed
        
        for (let s = 0; s < stepsPerFrame && this.currentPathIndex < this.cutPath.length; s++) {
            const point = this.cutPath[this.currentPathIndex];
            
            // Move machine to point
            this.xCarriage.position.x = point.x;
            this.gantry.position.z = point.z;
            
            // Lower the tool for cutting
            const cutDepthScene = this.cutDepth / 10; // Convert mm to scene units
            this.zCarriage.position.y = -2 - (6.5 - this.workpieceSize.y) - cutDepthScene;
            
            // Draw cut on the texture
            this.drawCutOnTexture(point.x, point.z);
            
            // Add to trail points for 3D groove
            this.cutTrailPoints.push({ x: point.x, z: point.z });
            
            // Create particles occasionally
            if (this.currentPathIndex % 2 === 0) {
                this.createParticles(point.x, this.workpieceSize.y, point.z);
            }
            
            // Update UI
            this.progress = (this.currentPathIndex / this.cutPath.length) * 100;
            document.getElementById('progressValue').textContent = Math.floor(this.progress) + '%';
            document.getElementById('progressBar').style.width = this.progress + '%';
            document.getElementById('xPosition').textContent = point.x.toFixed(2);
            document.getElementById('yPosition').textContent = this.workpieceSize.y.toFixed(2);
            document.getElementById('zPosition').textContent = point.z.toFixed(2);
            document.getElementById('spindleRPM').textContent = Math.floor(this.speed * 100);
            
            this.currentPathIndex++;
        }
        
        // Cut trail mesh disabled - using texture-only visualization
        // if (this.currentPathIndex % 5 === 0) {
        //     this.updateCutTrailMesh();
        // }
        
        if (this.currentPathIndex >= this.cutPath.length) {
            this.complete();
        } else {
            requestAnimationFrame(() => this.runCutting());
        }
    }
    
    drawCutOnTexture(worldX, worldZ) {
        // Disabled - no longer drawing cut groove on texture
        // The cavity will be filled at completion instead
        return;
    }
    
    updateCutTrailMesh() {
        if (this.cutTrailPoints.length < 2) return;
        
        const depth = this.cutDepth / 10;
        const width = 0.25;
        
        const vertices = [];
        const indices = [];
        
        for (let i = 0; i < this.cutTrailPoints.length - 1; i++) {
            const p1 = this.cutTrailPoints[i];
            const p2 = this.cutTrailPoints[i + 1];
            
            // Calculate perpendicular direction
            const dx = p2.x - p1.x;
            const dz = p2.z - p1.z;
            const len = Math.sqrt(dx * dx + dz * dz);
            if (len === 0) continue;
            
            const nx = -dz / len * width;
            const nz = dx / len * width;
            
            const baseIndex = vertices.length / 3;
            
            // Add 4 vertices for this segment (left-bottom, right-bottom, left-top, right-top)
            // Bottom of groove - left
            vertices.push(p1.x + nx, -depth, p1.z + nz);
            // Bottom of groove - right
            vertices.push(p1.x - nx, -depth, p1.z - nz);
            // Top of groove - left
            vertices.push(p1.x + nx, 0.01, p1.z + nz);
            // Top of groove - right
            vertices.push(p1.x - nx, 0.01, p1.z - nz);
            
            if (i > 0) {
                // Connect to previous segment
                const prev = baseIndex - 4;
                // Left wall
                indices.push(prev, baseIndex, prev + 2);
                indices.push(baseIndex, baseIndex + 2, prev + 2);
                // Right wall
                indices.push(prev + 1, prev + 3, baseIndex + 1);
                indices.push(baseIndex + 1, prev + 3, baseIndex + 3);
                // Bottom
                indices.push(prev, prev + 1, baseIndex);
                indices.push(baseIndex, prev + 1, baseIndex + 1);
            }
        }
        
        if (vertices.length > 0) {
            this.cutTrailMesh.geometry.dispose();
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geometry.setIndex(indices);
            geometry.computeVertexNormals();
            this.cutTrailMesh.geometry = geometry;
        }
    }
    
    createParticles(x, y, z) {
        const particleCount = 5;
        
        for (let i = 0; i < particleCount; i++) {
            const geometry = new THREE.SphereGeometry(0.04, 4, 4);
            const material = new THREE.MeshBasicMaterial({ 
                color: 0xd4a574,
                transparent: true,
                opacity: 1
            });
            
            const particle = new THREE.Mesh(geometry, material);
            particle.position.set(
                x + (Math.random() - 0.5) * 0.4,
                y + 0.1 + Math.random() * 0.2,
                z + (Math.random() - 0.5) * 0.4
            );
            
            particle.userData = {
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.15,
                    Math.random() * 0.2 + 0.05,
                    (Math.random() - 0.5) * 0.15
                ),
                life: 1
            };
            
            this.particles.push(particle);
            this.scene.add(particle);
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            
            particle.position.add(particle.userData.velocity);
            particle.userData.velocity.y -= 0.012; // Gravity
            particle.userData.life -= 0.025;
            particle.material.opacity = Math.max(0, particle.userData.life);
            particle.scale.setScalar(particle.userData.life);
            
            if (particle.userData.life <= 0) {
                this.scene.remove(particle);
                particle.geometry.dispose();
                particle.material.dispose();
                this.particles.splice(i, 1);
            }
        }
    }
    
    complete() {
        this.isRunning = false;
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        
        const status = document.getElementById('machineStatus');
        status.textContent = 'COMPLETE';
        status.className = 'status-value complete';
        
        document.getElementById('spindleRPM').textContent = '0';
        
        // Raise the tool
        this.zCarriage.position.y = -2;
        
        // Turn light to success color
        this.spindleLight.material.color.setHex(0x6366f1);
        
        // Remove path preview
        if (this.pathLine) {
            this.scene.remove(this.pathLine);
            this.pathLine = null;
        }
        
        // Remove the cut trail mesh (the groove) completely
        if (this.cutTrailMesh) {
            this.scene.remove(this.cutTrailMesh);
            this.cutTrailMesh.geometry.dispose();
            this.cutTrailMesh.geometry = new THREE.BufferGeometry();
        }
        
        // Clear the cut texture completely before creating cavity
        if (this.cutContext) {
            this.cutContext.fillStyle = '#d4a574';
            this.cutContext.fillRect(0, 0, this.heightMapResolution, this.heightMapResolution);
            this.cutTexture.needsUpdate = true;
        }
        
        // Create and elevate the cut piece
        this.createCutPiece();
    }
    
    createCutPiece() {
        // Create a 3D shape based on the cut path
        const shape = new THREE.Shape();
        
        if (this.cutPath.length > 0) {
            // Move to first point
            shape.moveTo(this.cutPath[0].x, this.cutPath[0].z);
            
            // Draw the shape
            for (let i = 1; i < this.cutPath.length; i++) {
                shape.lineTo(this.cutPath[i].x, this.cutPath[i].z);
            }
            
            // Close the shape
            shape.lineTo(this.cutPath[0].x, this.cutPath[0].z);
        }
        
        // Extrude settings
        const extrudeSettings = {
            steps: 1,
            depth: this.cutDepth / 10, // Convert mm to scene units
            bevelEnabled: false
        };
        
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        
        // Rotate to lay flat (extrude goes along Z, we need Y)
        geometry.rotateX(-Math.PI / 2);
        
        const material = new THREE.MeshStandardMaterial({
            color: 0xd4a574,
            roughness: 0.6,
            metalness: 0.1
        });
        
        this.cutPieceMesh = new THREE.Mesh(geometry, material);
        this.cutPieceMesh.position.y = this.workpieceSize.y - this.cutDepth / 10;
        this.cutPieceMesh.castShadow = true;
        this.cutPieceMesh.receiveShadow = true;
        
        // Add edges for visibility
        const edges = new THREE.EdgesGeometry(geometry);
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x8b6914 });
        const wireframe = new THREE.LineSegments(edges, lineMaterial);
        this.cutPieceMesh.add(wireframe);
        
        this.scene.add(this.cutPieceMesh);
        
        // ========== BOOLEAN SUBTRACTION FIX ==========
        // Fill the interior of the cut shape with dark color to show cavity/hole
        this.fillCutCavity();
        
        // Disabled - cavity walls were causing the visible ring
        // this.createCavityMesh(shape);
        
        // Start elevation animation
        this.isElevating = true;
        this.elevationProgress = 0;
        this.elevateTargetY = this.workpieceSize.y + 1.5; // Elevate 1.5 units (about 15mm visual)
        this.elevateStartY = this.cutPieceMesh.position.y;
    }
    
    fillCutCavity() {
        // Fill the interior of the cut shape on the texture to show empty cavity
        if (!this.cutContext || this.cutPath.length < 3) return;
        
        // Convert cut path to texture coordinates
        const texPath = this.cutPath.map(p => ({
            x: ((p.x + this.workpieceSize.x / 2) / this.workpieceSize.x) * this.heightMapResolution,
            z: ((p.z + this.workpieceSize.z / 2) / this.workpieceSize.z) * this.heightMapResolution
        }));
        
        // First, draw a thick stroke around the path to cover the cut groove
        this.cutContext.strokeStyle = '#1a3a2e';
        this.cutContext.lineWidth = 25; // Thick line to cover the groove
        this.cutContext.lineJoin = 'round';
        this.cutContext.lineCap = 'round';
        this.cutContext.beginPath();
        this.cutContext.moveTo(texPath[0].x, texPath[0].z);
        for (let i = 1; i < texPath.length; i++) {
            this.cutContext.lineTo(texPath[i].x, texPath[i].z);
        }
        this.cutContext.closePath();
        this.cutContext.stroke();
        
        // Draw filled shape representing the cavity (dark color = empty space / bed visible)
        this.cutContext.fillStyle = '#1a3a2e';
        this.cutContext.beginPath();
        this.cutContext.moveTo(texPath[0].x, texPath[0].z);
        
        for (let i = 1; i < texPath.length; i++) {
            this.cutContext.lineTo(texPath[i].x, texPath[i].z);
        }
        
        this.cutContext.closePath();
        this.cutContext.fill();
        
        this.cutTexture.needsUpdate = true;
    }
    
    createCavityMesh(shape) {
        // Create a 3D hole/cavity in the workpiece to show the removed material
        // This is the negative space left after the cut piece is lifted
        
        const cavityDepth = this.cutDepth / 10;
        
        // Create cavity walls (extruded ring shape)
        // We'll create a simple cavity by making the inner walls visible
        
        // Create a shape for the cavity floor (the bed visible through the hole)
        const floorGeometry = new THREE.ShapeGeometry(shape);
        floorGeometry.rotateX(-Math.PI / 2); // Rotate to lay flat
        
        const floorMaterial = new THREE.MeshStandardMaterial({
            color: 0x1e293b, // Dark color representing the machine bed
            roughness: 0.8,
            metalness: 0.2,
            side: THREE.DoubleSide
        });
        
        this.cavityFloor = new THREE.Mesh(floorGeometry, floorMaterial);
        this.cavityFloor.position.y = this.workpieceSize.y - cavityDepth + 0.01; // Just above the cut depth
        this.cavityFloor.receiveShadow = true;
        this.scene.add(this.cavityFloor);
        
        // Create cavity walls using the same shape but as lines going down
        const wallVertices = [];
        const wallIndices = [];
        
        // Sample points along the cut path to create wall segments
        const wallPoints = [];
        for (let i = 0; i < this.cutPath.length; i += Math.max(1, Math.floor(this.cutPath.length / 60))) {
            wallPoints.push(this.cutPath[i]);
        }
        // Ensure we close the loop
        wallPoints.push(this.cutPath[0]);
        
        const topY = this.workpieceSize.y + 0.001; // Slightly above workpiece top
        const bottomY = this.workpieceSize.y - cavityDepth;
        
        for (let i = 0; i < wallPoints.length; i++) {
            const p = wallPoints[i];
            // Top vertex
            wallVertices.push(p.x, topY, p.z);
            // Bottom vertex
            wallVertices.push(p.x, bottomY, p.z);
        }
        
        // Create faces for walls
        for (let i = 0; i < wallPoints.length - 1; i++) {
            const topCurrent = i * 2;
            const bottomCurrent = i * 2 + 1;
            const topNext = (i + 1) * 2;
            const bottomNext = (i + 1) * 2 + 1;
            
            // Two triangles per wall segment (facing inward)
            wallIndices.push(topCurrent, topNext, bottomCurrent);
            wallIndices.push(bottomCurrent, topNext, bottomNext);
        }
        
        const wallGeometry = new THREE.BufferGeometry();
        wallGeometry.setAttribute('position', new THREE.Float32BufferAttribute(wallVertices, 3));
        wallGeometry.setIndex(wallIndices);
        wallGeometry.computeVertexNormals();
        
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: 0x6b5010, // Inner wall color (cut wood edge)
            roughness: 0.9,
            metalness: 0.0,
            side: THREE.DoubleSide
        });
        
        this.cavityWalls = new THREE.Mesh(wallGeometry, wallMaterial);
        this.cavityWalls.castShadow = true;
        this.cavityWalls.receiveShadow = true;
        this.scene.add(this.cavityWalls);
    }
    
    onWindowResize() {
        const container = document.getElementById('canvas-container');
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Update controls
        this.controls.update();
        
        // Rotate spindle when running
        if (this.isRunning && !this.isPaused) {
            this.spindleRotation += 0.4;
            this.spindle.rotation.y = this.spindleRotation;
        }
        
        // Animate cut piece elevation
        if (this.isElevating && this.cutPieceMesh) {
            this.elevationProgress += 0.015; // Smooth animation speed
            
            if (this.elevationProgress >= 1) {
                this.elevationProgress = 1;
                this.isElevating = false;
            }
            
            // Ease-out animation
            const easeOut = 1 - Math.pow(1 - this.elevationProgress, 3);
            this.cutPieceMesh.position.y = this.elevateStartY + (this.elevateTargetY - this.elevateStartY) * easeOut;
            
            // Add slight rotation for visual effect
            this.cutPieceMesh.rotation.y = easeOut * 0.1;
        }
        
        // Update particles
        this.updateParticles();
        
        // Render
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    new CNCSimulator3D();
});
