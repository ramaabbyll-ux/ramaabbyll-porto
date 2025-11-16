// 3D Animation with Three.js
class ThreeAnimation {
    constructor() {
        this.container = document.getElementById('animation-canvas-container');
        if (!this.container) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.networkGroup = null;
        this.nodes = [];
        this.animatedRings = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetRotationX = 0;
        this.targetRotationY = 0;
        this.currentRotationX = 0;
        this.currentRotationY = 0;

        this.init();
    }

    init() {
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLighting();
        this.createNetwork();
        this.setupEventListeners();
        this.animate();
    }

    setupScene() {
        this.scene = new THREE.Scene();
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.offsetWidth / this.container.offsetHeight,
            0.1,
            1000
        );
        this.camera.position.z = 4;
        this.camera.position.y = 1;
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });

        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
    }

    setupLighting() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
    }

    createNetwork() {
        this.networkGroup = new THREE.Group();
        this.createNodes();
        this.createConnections();
        this.scene.add(this.networkGroup);
    }

    createNodes() {
        const nodeCount = 35;
        const materials = this.createMaterials();

        for (let i = 0; i < nodeCount; i++) {
            const node = this.createNode(i, nodeCount, materials);
            this.nodes.push(node);
            this.networkGroup.add(node);
        }
    }

    createMaterials() {
        return {
            circleBlack: new THREE.MeshBasicMaterial({
                color: 0x1A1A1A,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.9
            }),
            circleGray: new THREE.MeshBasicMaterial({
                color: 0x666666,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.8
            }),
            ringBlack: new THREE.MeshBasicMaterial({
                color: 0x1A1A1A,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.7
            }),
            ringGray: new THREE.MeshBasicMaterial({
                color: 0x888888,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.6
            })
        };
    }

    createNode(index, totalNodes, materials) {
        const variant = Math.random();
        const radius = Math.random() * 0.06 + 0.02;
        
        let nodeObject = this.createNodeGeometry(variant, radius, materials);

        // Position nodes in clusters
        const position = this.calculateNodePosition(index, totalNodes);
        nodeObject.position.set(position.x, position.y, position.z);

        // Add movement data
        nodeObject.userData = {
            vx: (Math.random() - 0.5) * 0.02,
            vy: (Math.random() - 0.5) * 0.02,
            vz: (Math.random() - 0.5) * 0.01,
            originalScale: 1
        };

        return nodeObject;
    }

    createNodeGeometry(variant, radius, materials) {
        if (variant < 0.25) {
            const geometry = new THREE.CircleGeometry(radius * 0.5, 12);
            return new THREE.Mesh(geometry, materials.circleBlack);
        } else if (variant < 0.45) {
            const geometry = new THREE.CircleGeometry(radius * 0.8, 16);
            return new THREE.Mesh(geometry, materials.circleBlack);
        } else if (variant < 0.65) {
            const geometry = new THREE.RingGeometry(radius * 0.7, radius * 0.9, 20);
            const mesh = new THREE.Mesh(geometry, materials.ringBlack);
            this.animatedRings.push({
                object: mesh,
                speed: Math.random() * 0.5 + 0.3,
                offset: Math.random() * Math.PI * 2,
                scaleRange: 0.15
            });
            return mesh;
        } else if (variant < 0.80) {
            const geometry = new THREE.RingGeometry(radius * 0.6, radius * 0.85, 18);
            const mesh = new THREE.Mesh(geometry, materials.ringGray);
            this.animatedRings.push({
                object: mesh,
                speed: Math.random() * 0.4 + 0.2,
                offset: Math.random() * Math.PI * 2,
                scaleRange: 0.1
            });
            return mesh;
        } else {
            const geometry = new THREE.CircleGeometry(radius * 0.3, 8);
            return new THREE.Mesh(geometry, materials.circleBlack);
        }
    }

    calculateNodePosition(index, totalNodes) {
        let x, y, z;
        
        if (index < totalNodes * 0.3) {
            x = (Math.random() - 0.8) * 3;
            y = (Math.random() + 0.2) * 2;
            z = (Math.random() - 0.5) * 2;
        } else if (index < totalNodes * 0.6) {
            x = (Math.random() + 0.2) * 3;
            y = (Math.random() - 0.8) * 2;
            z = (Math.random() - 0.5) * 2;
        } else {
            x = (Math.random() - 0.5) * 4;
            y = (Math.random() - 0.5) * 3;
            z = (Math.random() - 0.5) * 3;
        }
        
        return { x, y, z };
    }

    createConnections() {
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x555555,
            transparent: true,
            opacity: 0.2,
            linewidth: 1
        });

        const lineGeometry = new THREE.BufferGeometry();
        const positions = [];
        const connectDistance = 2.0;

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const p1 = this.nodes[i].position;
                const p2 = this.nodes[j].position;
                const distance = p1.distanceTo(p2);
                
                if (distance < connectDistance) {
                    positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
                }
            }
        }

        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
        this.networkGroup.add(lines);
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        
        // Handle page visibility for performance
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.renderer.setAnimationLoop(null);
            } else {
                this.renderer.setAnimationLoop(() => this.animate());
            }
        });
    }

    onMouseMove(event) {
        const rect = this.container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        this.mouseX = (event.clientX - centerX) / (rect.width / 2);
        this.mouseY = (event.clientY - centerY) / (rect.height / 2);
        
        this.targetRotationY = this.mouseX * 0.3;
        this.targetRotationX = -this.mouseY * 0.2;
    }

    onWindowResize() {
        this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
    }

    animate() {
        const time = Date.now() * 0.001;
        
        // Smooth rotation
        this.currentRotationX += (this.targetRotationX - this.currentRotationX) * 0.05;
        this.currentRotationY += (this.targetRotationY - this.currentRotationY) * 0.05;
        
        this.networkGroup.rotation.x = this.currentRotationX + Math.sin(time * 0.1) * 0.05;
        this.networkGroup.rotation.y = this.currentRotationY + time * 0.05;
        
        this.animateNodes(time);
        this.animateRings(time);
        
        this.renderer.render(this.scene, this.camera);
    }

    animateNodes(time) {
        this.nodes.forEach((node, index) => {
            // Floating animation
            node.position.y += Math.sin(time * 0.5 + index) * 0.002;
            node.position.x += Math.cos(time * 0.3 + index) * 0.001;
            
            // Mouse influence
            const mouseDistance = Math.sqrt(
                Math.pow(node.position.x - this.mouseX * 2, 2) + 
                Math.pow(node.position.y - this.mouseY * 2, 2)
            );
            
            if (mouseDistance < 1.5) {
                const influence = (1.5 - mouseDistance) / 1.5;
                node.position.x += (node.position.x - this.mouseX * 2) * influence * 0.01;
                node.position.y += (node.position.y - this.mouseY * 2) * influence * 0.01;
            }
            
            // Always face camera
            node.lookAt(this.camera.position);
        });
    }

    animateRings(time) {
        this.animatedRings.forEach(ringData => {
            const scale = 1 + Math.sin(time * ringData.speed + ringData.offset) * ringData.scaleRange;
            ringData.object.scale.set(scale, scale, 1);
            ringData.object.rotation.z = time * ringData.speed * 0.1;
        });
    }

    cleanup() {
        if (this.renderer) {
            this.renderer.dispose();
            if (this.container.contains(this.renderer.domElement)) {
                this.container.removeChild(this.renderer.domElement);
            }
        }
    }
}

// Initialize Three.js animation when DOM is loaded
Utils.domReady(() => {
    new ThreeAnimation();
});