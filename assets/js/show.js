
var app = new Vue({
    el: '#megadiv',
    data: { 
        inicio : true,
        cronograma : false,
        somos:false,
        ubicanos: false
    },
    methods: {
        change : function(message){
            switch (message) {
                case 'inicio':
                    {
                        this.inicio = true;
                        this.cronograma = false;
                        this.somos = false;
                        this.ubicanos = false;
                    }
                    break;
                case 'cronograma':
                    
                    {
                        this.inicio = false;
                        this.cronograma = true;
                        this.somos = false;
                        this.ubicanos = false;
                    }
                    break;

                case 'somos':

                {
                    this.inicio = false;
                    this.cronograma = false;
                    this.somos=true;
                    this.ubicanos = false;
                }
                break;

                case 'ubicanos':

                {
                    this.inicio = false;
                    this.cronograma = false;
                    this.somos=false;
                    this.ubicanos = true;
                    
                }
                break;
                
                default:
                    break;
            }
        }
    }
});