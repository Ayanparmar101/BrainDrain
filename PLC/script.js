// 3D PLC Programming Simulator
// Using Three.js for realistic 3D visualization of industrial automation

class PLCSimulator3D {
    constructor() {
        // Scene setup
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        
        // Industrial equipment
        this.plcCabinet = null;
        this.motor1 = null;
        this.motor1Shaft = null;
        this.conveyor = null;
        this.conveyorBelt = null;
        this.conveyorRollers = [];
        this.actuator = null;
        this.actuatorArm = null;
        this.sensors = [];
        this.packages = [];
        
        // Indicators and lights
        this.statusLights = {};
        this.plcLEDs = [];
        
        // PLC State
        this.inputs = {
            X0: false, // Start button
            X1: false, // Stop button (NC - normally closed)
            X2: false, // Sensor 1
            X3: false  // Sensor 2
        };
        
        this.outputs = {
            Y0: false, // Motor 1
            Y1: false, // Conveyor
            Y2: false  // Actuator
        };
        
        this.timers = {
            T0: { value: 0, preset: 2000, done: false, running: false }
        };
        
        this.isRunning = false;
        this.scanTime = 0;
        this.cycleCount = 0;
        this.lastScanTime = 0;
        
        // Animation
        this.animationId = null;
        this.conveyorOffset = 0;
        this.motor1Rotation = 0;
        this.actuatorPosition = 0;
        
        // Package spawning
        this.packageSpawnTimer = 0;
        this.packageSpawnInterval = 3000;
        
        this.init();
    }
    
    init() {
        this.setupScene();
        this.setupLights();
        this.createFactory();
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
        this.scene.fog = new THREE.Fog(0x1a1a2e, 40, 100);
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        this.camera.position.set(25, 20, 25);
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
        this.controls.maxDistance = 60;
        this.controls.maxPolarAngle = Math.PI / 2;
        
        // Handle resize
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Add grid
        const gridHelper = new THREE.GridHelper(50, 50, 0x444466, 0x333355);
        gridHelper.position.y = -0.01;
        this.scene.add(gridHelper);
        
        // Ground plane
        const groundGeometry = new THREE.PlaneGeometry(60, 60);
        const groundMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x2a2a3a,
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
        const ambientLight = new THREE.AmbientLight(0x404060, 0.4);
        this.scene.add(ambientLight);
        
        // Main directional light
        const mainLight = new THREE.DirectionalLight(0xffffff, 1);
        mainLight.position.set(15, 25, 15);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        mainLight.shadow.camera.near = 1;
        mainLight.shadow.camera.far = 60;
        mainLight.shadow.camera.left = -25;
        mainLight.shadow.camera.right = 25;
        mainLight.shadow.camera.top = 25;
        mainLight.shadow.camera.bottom = -25;
        this.scene.add(mainLight);
        
        // Fill light
        const fillLight = new THREE.DirectionalLight(0x10b981, 0.2);
        fillLight.position.set(-15, 10, -15);
        this.scene.add(fillLight);
        
        // Factory ceiling lights
        for (let i = -1; i <= 1; i++) {
            const spotLight = new THREE.SpotLight(0xffffee, 0.5);
            spotLight.position.set(i * 12, 15, 0);
            spotLight.angle = Math.PI / 4;
            spotLight.penumbra = 0.5;
            spotLight.castShadow = true;
            this.scene.add(spotLight);
        }
    }
    
    createFactory() {
        // Materials
        const metalMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x708090, 
            roughness: 0.3,
            metalness: 0.8 
        });
        const darkMetalMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x2d3748, 
            roughness: 0.4,
            metalness: 0.7 
        });
        const plasticMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4a5568, 
            roughness: 0.6,
            metalness: 0.1 
        });
        
        // Create PLC Cabinet
        this.createPLCCabinet();
        
        // Create Motor 1
        this.createMotor1();
        
        // Create Conveyor System
        this.createConveyor();
        
        // Create Actuator (Pneumatic cylinder)
        this.createActuator();
        
        // Create Sensors
        this.createSensors();
        
        // Create Control Panel
        this.createControlPanel();
    }
    
    createPLCCabinet() {
        const cabinet = new THREE.Group();
        
        // Main cabinet body
        const cabinetGeometry = new THREE.BoxGeometry(3, 6, 2);
        const cabinetMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x374151, 
            roughness: 0.5,
            metalness: 0.6 
        });
        const cabinetBody = new THREE.Mesh(cabinetGeometry, cabinetMaterial);
        cabinetBody.castShadow = true;
        cabinetBody.receiveShadow = true;
        cabinet.add(cabinetBody);
        
        // Cabinet door
        const doorGeometry = new THREE.BoxGeometry(2.8, 5.8, 0.1);
        const doorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4b5563, 
            roughness: 0.4,
            metalness: 0.7 
        });
        const door = new THREE.Mesh(doorGeometry, doorMaterial);
        door.position.z = 1;
        cabinet.add(door);
        
        // PLC Module inside cabinet
        const plcGeometry = new THREE.BoxGeometry(2, 1.5, 0.5);
        const plcMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1e293b, 
            roughness: 0.3,
            metalness: 0.5 
        });
        const plcModule = new THREE.Mesh(plcGeometry, plcMaterial);
        plcModule.position.set(0, 1.5, 0.8);
        cabinet.add(plcModule);
        
        // PLC LEDs
        const ledColors = [0x10b981, 0xef4444, 0xf59e0b, 0x6366f1];
        for (let i = 0; i < 8; i++) {
            const ledGeometry = new THREE.SphereGeometry(0.08, 16, 16);
            const ledMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
            const led = new THREE.Mesh(ledGeometry, ledMaterial);
            led.position.set(-0.8 + (i % 4) * 0.5, 1.8 + Math.floor(i / 4) * 0.3, 1.1);
            led.userData = { baseColor: ledColors[i % 4] };
            this.plcLEDs.push(led);
            cabinet.add(led);
        }
        
        // Terminal blocks
        const terminalGeometry = new THREE.BoxGeometry(2, 0.8, 0.3);
        const terminalMaterial = new THREE.MeshStandardMaterial({ color: 0x059669 });
        const terminals = new THREE.Mesh(terminalGeometry, terminalMaterial);
        terminals.position.set(0, 0, 0.8);
        cabinet.add(terminals);
        
        // Cabinet label
        const labelGeometry = new THREE.PlaneGeometry(1.5, 0.4);
        const labelMaterial = new THREE.MeshBasicMaterial({ color: 0x10b981 });
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.set(0, 2.5, 1.05);
        cabinet.add(label);
        
        cabinet.position.set(-12, 3, 0);
        this.plcCabinet = cabinet;
        this.scene.add(cabinet);
    }
    
    createMotor1() {
        const motor = new THREE.Group();
        
        // Motor body (cylindrical)
        const motorBodyGeometry = new THREE.CylinderGeometry(1.2, 1.2, 2.5, 32);
        const motorMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1e40af, 
            roughness: 0.4,
            metalness: 0.7 
        });
        const motorBody = new THREE.Mesh(motorBodyGeometry, motorMaterial);
        motorBody.rotation.z = Math.PI / 2;
        motorBody.castShadow = true;
        motor.add(motorBody);
        
        // Motor end caps
        const endCapGeometry = new THREE.CylinderGeometry(1.3, 1.3, 0.2, 32);
        const endCapMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x374151, 
            roughness: 0.3,
            metalness: 0.8 
        });
        
        const endCap1 = new THREE.Mesh(endCapGeometry, endCapMaterial);
        endCap1.rotation.z = Math.PI / 2;
        endCap1.position.x = -1.3;
        motor.add(endCap1);
        
        const endCap2 = new THREE.Mesh(endCapGeometry, endCapMaterial);
        endCap2.rotation.z = Math.PI / 2;
        endCap2.position.x = 1.3;
        motor.add(endCap2);
        
        // Motor shaft
        const shaftGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 16);
        const shaftMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x9ca3af, 
            roughness: 0.2,
            metalness: 0.9 
        });
        this.motor1Shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
        this.motor1Shaft.rotation.z = Math.PI / 2;
        this.motor1Shaft.position.x = 2.3;
        motor.add(this.motor1Shaft);
        
        // Cooling fins
        for (let i = 0; i < 8; i++) {
            const finGeometry = new THREE.BoxGeometry(0.05, 0.3, 2);
            const fin = new THREE.Mesh(finGeometry, endCapMaterial);
            const angle = (i / 8) * Math.PI * 2;
            fin.position.set(0, Math.cos(angle) * 1.1, Math.sin(angle) * 1.1);
            motor.add(fin);
        }
        
        // Motor mount
        const mountGeometry = new THREE.BoxGeometry(3, 0.5, 2.5);
        const mountMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4b5563, 
            roughness: 0.5,
            metalness: 0.6 
        });
        const mount = new THREE.Mesh(mountGeometry, mountMaterial);
        mount.position.y = -1.5;
        mount.castShadow = true;
        motor.add(mount);
        
        // Status light on motor
        const lightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const lightMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
        this.statusLights.motor1 = new THREE.Mesh(lightGeometry, lightMaterial);
        this.statusLights.motor1.position.set(0, 1.3, 0);
        motor.add(this.statusLights.motor1);
        
        motor.position.set(-5, 2, -8);
        this.motor1 = motor;
        this.scene.add(motor);
    }
    
    createConveyor() {
        const conveyor = new THREE.Group();
        
        // Conveyor frame
        const frameGeometry = new THREE.BoxGeometry(20, 0.3, 3);
        const frameMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x374151, 
            roughness: 0.5,
            metalness: 0.7 
        });
        const frame = new THREE.Mesh(frameGeometry, frameMaterial);
        frame.position.y = 0.5;
        frame.castShadow = true;
        conveyor.add(frame);
        
        // Side rails
        const railGeometry = new THREE.BoxGeometry(20, 0.8, 0.2);
        const railMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xf59e0b, 
            roughness: 0.4,
            metalness: 0.6 
        });
        
        const leftRail = new THREE.Mesh(railGeometry, railMaterial);
        leftRail.position.set(0, 0.9, 1.6);
        conveyor.add(leftRail);
        
        const rightRail = new THREE.Mesh(railGeometry, railMaterial);
        rightRail.position.set(0, 0.9, -1.6);
        conveyor.add(rightRail);
        
        // Conveyor belt (textured plane)
        const beltGeometry = new THREE.PlaneGeometry(19.5, 2.8, 40, 1);
        const beltMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1f2937, 
            roughness: 0.8,
            metalness: 0.1,
            side: THREE.DoubleSide
        });
        this.conveyorBelt = new THREE.Mesh(beltGeometry, beltMaterial);
        this.conveyorBelt.rotation.x = -Math.PI / 2;
        this.conveyorBelt.position.y = 0.7;
        conveyor.add(this.conveyorBelt);
        
        // Belt stripes (for visual movement)
        for (let i = -9; i <= 9; i++) {
            const stripeGeometry = new THREE.PlaneGeometry(0.1, 2.6);
            const stripeMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x374151,
                side: THREE.DoubleSide
            });
            const stripe = new THREE.Mesh(stripeGeometry, stripeMaterial);
            stripe.rotation.x = -Math.PI / 2;
            stripe.position.set(i, 0.71, 0);
            stripe.userData.baseX = i;
            this.conveyorRollers.push(stripe);
            conveyor.add(stripe);
        }
        
        // Support legs
        const legGeometry = new THREE.BoxGeometry(0.3, 2, 0.3);
        const legMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4b5563, 
            roughness: 0.6,
            metalness: 0.5 
        });
        
        const legPositions = [[-9, -8], [-3, -8], [3, -8], [9, -8]];
        legPositions.forEach(pos => {
            const leg = new THREE.Mesh(legGeometry, legMaterial);
            leg.position.set(pos[0], -0.6, pos[1] + 8);
            leg.castShadow = true;
            conveyor.add(leg);
        });
        
        // Status light for conveyor
        const lightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const lightMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
        this.statusLights.conveyor = new THREE.Mesh(lightGeometry, lightMaterial);
        this.statusLights.conveyor.position.set(-9, 1.5, 0);
        conveyor.add(this.statusLights.conveyor);
        
        conveyor.position.set(0, 1.5, 0);
        this.conveyor = conveyor;
        this.scene.add(conveyor);
    }
    
    createActuator() {
        const actuator = new THREE.Group();
        
        // Pneumatic cylinder body
        const cylinderGeometry = new THREE.CylinderGeometry(0.4, 0.4, 3, 32);
        const cylinderMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x6b7280, 
            roughness: 0.3,
            metalness: 0.8 
        });
        const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
        cylinder.castShadow = true;
        actuator.add(cylinder);
        
        // Cylinder end caps
        const capGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32);
        const capMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x374151, 
            roughness: 0.4,
            metalness: 0.7 
        });
        
        const topCap = new THREE.Mesh(capGeometry, capMaterial);
        topCap.position.y = 1.6;
        actuator.add(topCap);
        
        const bottomCap = new THREE.Mesh(capGeometry, capMaterial);
        bottomCap.position.y = -1.6;
        actuator.add(bottomCap);
        
        // Piston rod
        const rodGeometry = new THREE.CylinderGeometry(0.15, 0.15, 2, 16);
        const rodMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xd1d5db, 
            roughness: 0.1,
            metalness: 0.9 
        });
        this.actuatorArm = new THREE.Mesh(rodGeometry, rodMaterial);
        this.actuatorArm.position.y = -2.5;
        actuator.add(this.actuatorArm);
        
        // Push plate at end of rod
        const plateGeometry = new THREE.BoxGeometry(2, 0.3, 2);
        const plateMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xef4444, 
            roughness: 0.5,
            metalness: 0.4 
        });
        const plate = new THREE.Mesh(plateGeometry, plateMaterial);
        plate.position.y = -1;
        this.actuatorArm.add(plate);
        
        // Mount bracket
        const bracketGeometry = new THREE.BoxGeometry(1.5, 0.5, 1.5);
        const bracketMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4b5563, 
            roughness: 0.5,
            metalness: 0.6 
        });
        const bracket = new THREE.Mesh(bracketGeometry, bracketMaterial);
        bracket.position.y = 2;
        actuator.add(bracket);
        
        // Support structure
        const supportGeometry = new THREE.BoxGeometry(0.5, 5, 0.5);
        const supportMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x374151, 
            roughness: 0.5,
            metalness: 0.6 
        });
        const support = new THREE.Mesh(supportGeometry, supportMaterial);
        support.position.set(0, 4, 0);
        actuator.add(support);
        
        // Crossbeam
        const beamGeometry = new THREE.BoxGeometry(4, 0.5, 0.5);
        const beam = new THREE.Mesh(beamGeometry, supportMaterial);
        beam.position.set(0, 6.5, 0);
        actuator.add(beam);
        
        // Status light
        const lightGeometry = new THREE.SphereGeometry(0.15, 16, 16);
        const lightMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
        this.statusLights.actuator = new THREE.Mesh(lightGeometry, lightMaterial);
        this.statusLights.actuator.position.set(0.6, 0, 0);
        actuator.add(this.statusLights.actuator);
        
        actuator.position.set(6, 1.5, 0);
        this.actuator = actuator;
        this.scene.add(actuator);
    }
    
    createSensors() {
        // Sensor 1 (X2) - at conveyor start
        const sensor1 = this.createSensor('X2', 'Sensor 1');
        sensor1.position.set(-5, 3, 2);
        this.sensors.push({ mesh: sensor1, input: 'X2' });
        this.scene.add(sensor1);
        
        // Sensor 2 (X3) - at conveyor middle
        const sensor2 = this.createSensor('X3', 'Sensor 2');
        sensor2.position.set(2, 3, 2);
        this.sensors.push({ mesh: sensor2, input: 'X3' });
        this.scene.add(sensor2);
    }
    
    createSensor(id, name) {
        const sensor = new THREE.Group();
        
        // Sensor body
        const bodyGeometry = new THREE.BoxGeometry(0.6, 0.6, 1.2);
        const bodyMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x3b82f6, 
            roughness: 0.4,
            metalness: 0.5 
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        sensor.add(body);
        
        // Sensor lens
        const lensGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16);
        const lensMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x1e293b, 
            roughness: 0.2,
            metalness: 0.8 
        });
        const lens = new THREE.Mesh(lensGeometry, lensMaterial);
        lens.rotation.x = Math.PI / 2;
        lens.position.z = -0.65;
        sensor.add(lens);
        
        // Indicator LED
        const ledGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const ledMaterial = new THREE.MeshBasicMaterial({ color: 0x666666 });
        const led = new THREE.Mesh(ledGeometry, ledMaterial);
        led.position.set(0, 0.35, 0);
        sensor.add(led);
        
        // Mount bracket
        const bracketGeometry = new THREE.BoxGeometry(0.3, 1.5, 0.3);
        const bracketMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4b5563, 
            roughness: 0.5,
            metalness: 0.6 
        });
        const bracket = new THREE.Mesh(bracketGeometry, bracketMaterial);
        bracket.position.y = 1;
        sensor.add(bracket);
        
        sensor.userData = { id, name, led };
        this.statusLights[id] = led;
        
        return sensor;
    }
    
    createControlPanel() {
        const panel = new THREE.Group();
        
        // Panel body
        const panelGeometry = new THREE.BoxGeometry(2, 3, 0.5);
        const panelMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x4b5563, 
            roughness: 0.5,
            metalness: 0.6 
        });
        const panelBody = new THREE.Mesh(panelGeometry, panelMaterial);
        panelBody.castShadow = true;
        panel.add(panelBody);
        
        // Start button (green)
        const startBtnGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 32);
        const startBtnMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x22c55e, 
            roughness: 0.4,
            metalness: 0.3 
        });
        const startBtn = new THREE.Mesh(startBtnGeometry, startBtnMaterial);
        startBtn.rotation.x = Math.PI / 2;
        startBtn.position.set(-0.5, 0.8, 0.3);
        panel.add(startBtn);
        
        // Stop button (red)
        const stopBtnGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.15, 32);
        const stopBtnMaterial = new THREE.MeshStandardMaterial({ 
            color: 0xef4444, 
            roughness: 0.4,
            metalness: 0.3 
        });
        const stopBtn = new THREE.Mesh(stopBtnGeometry, stopBtnMaterial);
        stopBtn.rotation.x = Math.PI / 2;
        stopBtn.position.set(0.5, 0.8, 0.3);
        panel.add(stopBtn);
        
        // Status indicators
        const indicatorGeometry = new THREE.SphereGeometry(0.12, 16, 16);
        
        const runIndicator = new THREE.Mesh(indicatorGeometry, new THREE.MeshBasicMaterial({ color: 0x666666 }));
        runIndicator.position.set(-0.5, 0, 0.3);
        this.statusLights.run = runIndicator;
        panel.add(runIndicator);
        
        const faultIndicator = new THREE.Mesh(indicatorGeometry, new THREE.MeshBasicMaterial({ color: 0x666666 }));
        faultIndicator.position.set(0, 0, 0.3);
        this.statusLights.fault = faultIndicator;
        panel.add(faultIndicator);
        
        const powerIndicator = new THREE.Mesh(indicatorGeometry, new THREE.MeshBasicMaterial({ color: 0x22c55e }));
        powerIndicator.position.set(0.5, 0, 0.3);
        this.statusLights.power = powerIndicator;
        panel.add(powerIndicator);
        
        // Panel stand
        const standGeometry = new THREE.CylinderGeometry(0.15, 0.2, 4, 16);
        const standMaterial = new THREE.MeshStandardMaterial({ 
            color: 0x374151, 
            roughness: 0.5,
            metalness: 0.6 
        });
        const stand = new THREE.Mesh(standGeometry, standMaterial);
        stand.position.y = -3.5;
        panel.add(stand);
        
        panel.position.set(-12, 5, 6);
        panel.rotation.y = Math.PI / 4;
        this.scene.add(panel);
    }
    
    spawnPackage() {
        const packageGeometry = new THREE.BoxGeometry(1.2, 1, 1.2);
        const packageMaterial = new THREE.MeshStandardMaterial({ 
            color: Math.random() > 0.5 ? 0xf59e0b : 0x3b82f6, 
            roughness: 0.6,
            metalness: 0.2 
        });
        const pkg = new THREE.Mesh(packageGeometry, packageMaterial);
        pkg.position.set(-8, 2.7, 0);
        pkg.castShadow = true;
        pkg.userData = { 
            active: true,
            triggeredSensor1: false,
            triggeredSensor2: false
        };
        this.packages.push(pkg);
        this.scene.add(pkg);
    }
    
    setupEventListeners() {
        // Run/Stop/Reset buttons
        document.getElementById('runBtn').addEventListener('click', () => this.startPLC());
        document.getElementById('stopBtn').addEventListener('click', () => this.stopPLC());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetPLC());
        
        // Input buttons
        const inputButtons = document.querySelectorAll('.input-btn');
        inputButtons.forEach(btn => {
            const input = btn.dataset.input;
            
            if (btn.classList.contains('momentary')) {
                // Momentary button (Start)
                btn.addEventListener('mousedown', () => this.setInput(input, true));
                btn.addEventListener('mouseup', () => this.setInput(input, false));
                btn.addEventListener('mouseleave', () => this.setInput(input, false));
            } else {
                // Toggle button
                btn.addEventListener('click', () => this.toggleInput(input));
            }
        });
        
        // Camera buttons
        const cameraButtons = document.querySelectorAll('.camera-btn');
        cameraButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                cameraButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.setCameraView(btn.dataset.view);
            });
        });
    }
    
    setInput(input, value) {
        this.inputs[input] = value;
        this.updateInputUI(input);
    }
    
    toggleInput(input) {
        this.inputs[input] = !this.inputs[input];
        this.updateInputUI(input);
    }
    
    updateInputUI(input) {
        const btn = document.getElementById(input);
        if (btn) {
            if (this.inputs[input]) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    }
    
    startPLC() {
        this.isRunning = true;
        document.getElementById('runBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        document.getElementById('plcMode').textContent = 'RUN';
        document.getElementById('plcMode').style.color = '#22c55e';
        
        // Update status light
        if (this.statusLights.run) {
            this.statusLights.run.material.color.setHex(0x22c55e);
        }
        
        this.lastScanTime = performance.now();
    }
    
    stopPLC() {
        this.isRunning = false;
        document.getElementById('runBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        document.getElementById('plcMode').textContent = 'STOP';
        document.getElementById('plcMode').style.color = '#ef4444';
        
        // Turn off all outputs
        Object.keys(this.outputs).forEach(key => {
            this.outputs[key] = false;
        });
        
        // Reset timers
        Object.keys(this.timers).forEach(key => {
            this.timers[key].running = false;
            this.timers[key].done = false;
            this.timers[key].value = 0;
        });
        
        // Update status light
        if (this.statusLights.run) {
            this.statusLights.run.material.color.setHex(0x666666);
        }
        
        this.updateOutputUI();
        this.updateLadderUI();
        this.updateTimerUI();
    }
    
    resetPLC() {
        this.stopPLC();
        
        // Reset all inputs
        Object.keys(this.inputs).forEach(key => {
            this.inputs[key] = false;
            this.updateInputUI(key);
        });
        
        // Reset counters
        this.cycleCount = 0;
        document.getElementById('cycleCount').textContent = '0';
        
        // Remove all packages
        this.packages.forEach(pkg => {
            this.scene.remove(pkg);
        });
        this.packages = [];
        
        // Reset actuator position
        this.actuatorPosition = 0;
        if (this.actuatorArm) {
            this.actuatorArm.position.y = -2.5;
        }
    }
    
    executeLadderLogic() {
        if (!this.isRunning) return;
        
        const startTime = performance.now();
        
        // Store previous output states for edge detection
        const prevOutputs = { ...this.outputs };
        
        // Rung 1: X0 (Start) AND NOT X1 (Stop) -> Y0 (Motor 1)
        // Also include Y0 seal-in contact
        const rung1 = (this.inputs.X0 || this.outputs.Y0) && !this.inputs.X1;
        this.outputs.Y0 = rung1;
        
        // Rung 2: Y0 AND X2 (Sensor 1) -> Y1 (Conveyor)
        const rung2 = this.outputs.Y0 && this.inputs.X2;
        this.outputs.Y1 = rung2;
        
        // Rung 3: Y1 AND X3 (Sensor 2) -> Timer T0
        const rung3Enable = this.outputs.Y1 && this.inputs.X3;
        
        // Timer logic
        if (rung3Enable) {
            if (!this.timers.T0.done) {
                this.timers.T0.running = true;
                this.timers.T0.value += 16; // Approximate frame time
                if (this.timers.T0.value >= this.timers.T0.preset) {
                    this.timers.T0.done = true;
                    this.timers.T0.value = this.timers.T0.preset;
                }
            }
        } else {
            this.timers.T0.running = false;
            this.timers.T0.value = 0;
            this.timers.T0.done = false;
        }
        
        // Rung 4: Timer T0 Done -> Y2 (Actuator)
        this.outputs.Y2 = this.timers.T0.done;
        
        // Update scan time
        this.scanTime = performance.now() - startTime;
        this.cycleCount++;
        
        // Update UI
        this.updateOutputUI();
        this.updateLadderUI();
        this.updateTimerUI();
        
        document.getElementById('scanTime').textContent = this.scanTime.toFixed(2) + ' ms';
        document.getElementById('cycleCount').textContent = this.cycleCount;
    }
    
    updateOutputUI() {
        Object.keys(this.outputs).forEach(output => {
            const indicator = document.querySelector(`.output-indicator[data-output="${output}"]`);
            if (indicator) {
                if (this.outputs[output]) {
                    indicator.classList.add('active');
                    indicator.querySelector('.output-state').textContent = 'ON';
                } else {
                    indicator.classList.remove('active');
                    indicator.querySelector('.output-state').textContent = 'OFF';
                }
            }
        });
    }
    
    updateLadderUI() {
        // Update Rung 1
        const rung1 = document.querySelector('.rung[data-rung="1"]');
        if (rung1) {
            rung1.classList.toggle('active', this.outputs.Y0);
            
            const x0Contact = rung1.querySelector('[data-input="X0"]');
            const x1Contact = rung1.querySelector('[data-input="X1"]');
            const y0Coil = rung1.querySelector('[data-output="Y0"]');
            
            if (x0Contact) x0Contact.classList.toggle('active', this.inputs.X0 || this.outputs.Y0);
            if (x1Contact) x1Contact.classList.toggle('active', !this.inputs.X1);
            if (y0Coil) y0Coil.classList.toggle('active', this.outputs.Y0);
        }
        
        // Update Rung 2
        const rung2 = document.querySelector('.rung[data-rung="2"]');
        if (rung2) {
            rung2.classList.toggle('active', this.outputs.Y1);
            
            const y0Contact = rung2.querySelector('[data-input="Y0"]');
            const x2Contact = rung2.querySelector('[data-input="X2"]');
            const y1Coil = rung2.querySelector('[data-output="Y1"]');
            
            if (y0Contact) y0Contact.classList.toggle('active', this.outputs.Y0);
            if (x2Contact) x2Contact.classList.toggle('active', this.inputs.X2);
            if (y1Coil) y1Coil.classList.toggle('active', this.outputs.Y1);
        }
        
        // Update Rung 3
        const rung3 = document.querySelector('.rung[data-rung="3"]');
        if (rung3) {
            rung3.classList.toggle('active', this.timers.T0.running || this.timers.T0.done);
            
            const y1Contact = rung3.querySelector('[data-input="Y1"]');
            const x3Contact = rung3.querySelector('[data-input="X3"]');
            const t0Timer = rung3.querySelector('[data-timer="T0"]');
            
            if (y1Contact) y1Contact.classList.toggle('active', this.outputs.Y1);
            if (x3Contact) x3Contact.classList.toggle('active', this.inputs.X3);
            if (t0Timer) t0Timer.classList.toggle('active', this.timers.T0.running || this.timers.T0.done);
        }
        
        // Update Rung 4
        const rung4 = document.querySelector('.rung[data-rung="4"]');
        if (rung4) {
            rung4.classList.toggle('active', this.outputs.Y2);
            
            const t0Contact = rung4.querySelector('[data-input="T0"]');
            const y2Coil = rung4.querySelector('[data-output="Y2"]');
            
            if (t0Contact) t0Contact.classList.toggle('active', this.timers.T0.done);
            if (y2Coil) y2Coil.classList.toggle('active', this.outputs.Y2);
        }
    }
    
    updateTimerUI() {
        const timerBar = document.getElementById('timerBar');
        const timerValue = document.getElementById('timerValue');
        
        if (timerBar && timerValue) {
            const percentage = (this.timers.T0.value / this.timers.T0.preset) * 100;
            timerBar.style.width = percentage + '%';
            timerValue.textContent = (this.timers.T0.value / 1000).toFixed(1) + 's / ' + 
                                    (this.timers.T0.preset / 1000).toFixed(1) + 's';
        }
    }
    
    update3DScene() {
        // Update Motor 1 rotation
        if (this.outputs.Y0 && this.motor1Shaft) {
            this.motor1Rotation += 0.15;
            this.motor1Shaft.rotation.x = this.motor1Rotation;
            
            // Update motor status light
            if (this.statusLights.motor1) {
                this.statusLights.motor1.material.color.setHex(0x22c55e);
            }
        } else {
            if (this.statusLights.motor1) {
                this.statusLights.motor1.material.color.setHex(0x666666);
            }
        }
        
        // Update Conveyor
        if (this.outputs.Y1) {
            this.conveyorOffset += 0.05;
            
            // Move belt stripes
            this.conveyorRollers.forEach(stripe => {
                stripe.position.x = stripe.userData.baseX + (this.conveyorOffset % 2);
                if (stripe.position.x > 10) {
                    stripe.userData.baseX -= 20;
                }
            });
            
            // Update conveyor status light
            if (this.statusLights.conveyor) {
                this.statusLights.conveyor.material.color.setHex(0x22c55e);
            }
            
            // Move packages
            this.packages.forEach(pkg => {
                if (pkg.userData.active) {
                    pkg.position.x += 0.02;
                    
                    // Check sensor 1 trigger
                    if (pkg.position.x > -5 && pkg.position.x < -4 && !pkg.userData.triggeredSensor1) {
                        this.inputs.X2 = true;
                        this.updateInputUI('X2');
                        pkg.userData.triggeredSensor1 = true;
                        
                        // Auto-release sensor after package passes
                        setTimeout(() => {
                            this.inputs.X2 = false;
                            this.updateInputUI('X2');
                        }, 500);
                    }
                    
                    // Check sensor 2 trigger
                    if (pkg.position.x > 2 && pkg.position.x < 3 && !pkg.userData.triggeredSensor2) {
                        this.inputs.X3 = true;
                        this.updateInputUI('X3');
                        pkg.userData.triggeredSensor2 = true;
                    }
                    
                    // Check if actuator should push package off
                    if (pkg.position.x > 5 && pkg.position.x < 7 && this.outputs.Y2) {
                        pkg.position.z += 0.08;
                        if (pkg.position.z > 4) {
                            pkg.userData.active = false;
                            this.inputs.X3 = false;
                            this.updateInputUI('X3');
                        }
                    }
                    
                    // Remove package if it goes too far
                    if (pkg.position.x > 12 || pkg.position.z > 8) {
                        pkg.userData.active = false;
                        this.inputs.X3 = false;
                        this.updateInputUI('X3');
                    }
                }
            });
            
            // Clean up inactive packages
            this.packages = this.packages.filter(pkg => {
                if (!pkg.userData.active) {
                    this.scene.remove(pkg);
                    return false;
                }
                return true;
            });
        } else {
            if (this.statusLights.conveyor) {
                this.statusLights.conveyor.material.color.setHex(0x666666);
            }
        }
        
        // Update Actuator
        const targetPosition = this.outputs.Y2 ? -1 : -2.5;
        if (this.actuatorArm) {
            this.actuatorArm.position.y += (targetPosition - this.actuatorArm.position.y) * 0.1;
            
            // Update actuator status light
            if (this.statusLights.actuator) {
                this.statusLights.actuator.material.color.setHex(this.outputs.Y2 ? 0x22c55e : 0x666666);
            }
        }
        
        // Update sensor lights
        if (this.statusLights.X2) {
            this.statusLights.X2.material.color.setHex(this.inputs.X2 ? 0x22c55e : 0x666666);
        }
        if (this.statusLights.X3) {
            this.statusLights.X3.material.color.setHex(this.inputs.X3 ? 0x22c55e : 0x666666);
        }
        
        // Update PLC cabinet LEDs
        this.plcLEDs.forEach((led, index) => {
            if (this.isRunning) {
                // Blink pattern when running
                const shouldLight = (Date.now() / 200 + index) % 4 < 2;
                if (index < 4) {
                    // Input LEDs
                    const inputs = ['X0', 'X1', 'X2', 'X3'];
                    led.material.color.setHex(this.inputs[inputs[index]] ? 0x22c55e : 0x333333);
                } else {
                    // Output LEDs
                    const outputs = ['Y0', 'Y1', 'Y2'];
                    if (index - 4 < 3) {
                        led.material.color.setHex(this.outputs[outputs[index - 4]] ? 0x22c55e : 0x333333);
                    } else {
                        led.material.color.setHex(shouldLight ? led.userData.baseColor : 0x333333);
                    }
                }
            } else {
                led.material.color.setHex(0x333333);
            }
        });
        
        // Spawn packages periodically when system is running
        if (this.isRunning && this.outputs.Y1) {
            this.packageSpawnTimer += 16;
            if (this.packageSpawnTimer > this.packageSpawnInterval && this.packages.length < 5) {
                this.spawnPackage();
                this.packageSpawnTimer = 0;
            }
        }
    }
    
    setCameraView(view) {
        switch(view) {
            case 'perspective':
                this.animateCamera({ x: 25, y: 20, z: 25 }, { x: 0, y: 2, z: 0 });
                break;
            case 'top':
                this.animateCamera({ x: 0, y: 35, z: 0.1 }, { x: 0, y: 0, z: 0 });
                break;
            case 'front':
                this.animateCamera({ x: 0, y: 8, z: 30 }, { x: 0, y: 3, z: 0 });
                break;
            case 'side':
                this.animateCamera({ x: 35, y: 8, z: 0 }, { x: 0, y: 3, z: 0 });
                break;
        }
    }
    
    animateCamera(targetPosition, targetLookAt) {
        const startPosition = {
            x: this.camera.position.x,
            y: this.camera.position.y,
            z: this.camera.position.z
        };
        const startTarget = {
            x: this.controls.target.x,
            y: this.controls.target.y,
            z: this.controls.target.z
        };
        
        let progress = 0;
        const duration = 1000;
        const startTime = Date.now();
        
        const animate = () => {
            progress = (Date.now() - startTime) / duration;
            
            if (progress < 1) {
                const eased = 1 - Math.pow(1 - progress, 3);
                
                this.camera.position.x = startPosition.x + (targetPosition.x - startPosition.x) * eased;
                this.camera.position.y = startPosition.y + (targetPosition.y - startPosition.y) * eased;
                this.camera.position.z = startPosition.z + (targetPosition.z - startPosition.z) * eased;
                
                this.controls.target.x = startTarget.x + (targetLookAt.x - startTarget.x) * eased;
                this.controls.target.y = startTarget.y + (targetLookAt.y - startTarget.y) * eased;
                this.controls.target.z = startTarget.z + (targetLookAt.z - startTarget.z) * eased;
                
                requestAnimationFrame(animate);
            }
        };
        
        animate();
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
        
        // Execute PLC logic
        this.executeLadderLogic();
        
        // Update 3D scene
        this.update3DScene();
        
        // Update controls
        this.controls.update();
        
        // Render
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the simulator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.plcSimulator = new PLCSimulator3D();
});
