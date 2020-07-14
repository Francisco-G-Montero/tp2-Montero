var app = new Vue({
    el: '#app',
    data: {
        token: '',
        carreras: [],
        materias: [],
        alumnos: [],
        carrera: {
        	nombre: ''
        },
        materia: {
        	nombre: '',
        	carrera: null
        },
        alumno: {
        	nombre: '',
        	apellido: '',
        	legajo: ''
        },
        alumnoMateria: {
            alumnos: [],
            materia: null
        }
    },
    methods: {
        getCarreras() {
            axios.get('http://localhost/carreras')
                .then(response => {
                    this.carreras = response.data;
                });
        },
        getMaterias() {
            axios.get('http://localhost/materias')
                .then(response => {
                    this.materias = response.data;
                });
        },
        getAlumnos() {
            axios.get('http://localhost/alumnos')
                .then(response => {
                    this.alumnos = response.data;
                });
        },
        createCarrera() {
        	let data = {
        		nombre: this.carrera.nombre
        	};

            axios.post('http://localhost/carreras', data)
                .then(response => {
                    this.carreras.push(response.data);

                    this.carrera.nombre = '';
                });
        },
        deleteCarrera(carrera) {
			axios.delete('http://localhost/carreras/' + carrera.id)
                .then(response => {
                    this.getCarreras();
                });
        },
        createMateria() {
        	let data = {
        		nombre: this.materia.nombre,
        		carrera: this.materia.carrera
        	};

            axios.post('http://localhost/materias', data)
                .then(response => {
                    this.materias.push(response.data);

                    this.materia.nombre = '';
                    this.materia.carrera = '';
                });
        },
        deleteMateria(materia) {
			axios.delete('http://localhost/materias/' + materia.id)
                .then(response => {
                    this.getMaterias();
                });
        },
        createAlumno() {
            let data = {
                nombre: this.alumno.nombre,
                apellido: this.alumno.apellido,
                legajo: this.alumno.legajo
            };

            axios.post('http://localhost/alumnos', data)
                .then(response => {
                    this.alumnos.push(response.data);

                    this.alumno.nombre = '';
                    this.alumno.apellido = '';
                    this.alumno.legajo = '';
                });
        },
        deleteAlumno(alumno) {
            axios.delete('http://localhost/alumnos/' + alumno.id)
                .then(response => {
                    this.getAlumnos();
                    this.getMaterias();
                });
        },
        assignAlumnoToMateria() {
            let data = {
                alumnos: this.alumnoMateria.alumnos
            };

            axios.put('http://localhost/materias/' +  this.alumnoMateria.materia, data)
                .then(response => {
                    this.getMaterias();

                    this.alumnoMateria.alumnos = [];
                    this.alumnoMateria.materia = null;
                });
        }
    },
    mounted() {
        this.getCarreras();
        this.getMaterias();
        this.getAlumnos();
    }
})
