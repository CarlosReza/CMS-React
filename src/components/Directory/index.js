import React,{Component} from 'react';
import DataTable from 'react-data-table-component';

class Directory extends Component{
    constructor(props) {
        super(props)
        this.state = { users: []
       }
      }
render(){
    if (this.state.users.length > 0) {        
        const columns = [
            {
              name: 'Nombre',
              selector: 'name',
              sortable: true,
            },
            {
              name: 'Correo',
              selector: 'email',
              sortable: true,
              right: true,
            },
          ];

        return (
          <div className="container-fluid">
           <ul className="">
           <DataTable
        title="Listado de personal"
        columns={columns}
        data={this.state.users}
        pagination = {true}
      />
                    </ul>
          </div>
        )
      } else {
        return <p className="text-center">Cargando empleados...</p>
      }
}

componentWillMount() {
    fetch('https://randomuser.me/api/?results=50')
      .then((response) => {
        return response.json()
      })
      .then((users) => {
        users.results.forEach(user =>{
            let data ={
                name:user.name.first,
                email: user.email
            }
          this.setState({ users: this.state.users.concat([data]) })
        })  
       
      })
  }

}
export default Directory;