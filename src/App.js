import React, { Component } from 'react';
import { Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios';
import ReactToExcel from 'react-html-table-to-excel';
import './App.css'

class App extends Component {

  state = {
    customers: [],
    NewCustomerModal: false,
    editCustomerModal: false,
    newCustomerData: {
      email: '',
      first_name: '',
      last_name: '',
      ip: '',
      latitude: '',
      longitude: '',
      created_at: '',
      updated_at: '',
    },
    editCustomerData: {
      id: '',
      email: '',
      first_name: '',
      last_name: '',
      ip: '',
      latitude: '',
      longitude: '',
      created_at: '',
      updated_at: '',
    }
  }
  componentWillMount() {
    this.refreshCustomers();
    axios.get('https://marcusbassportfolioserver.herokuapp.com/customers').then((response) => {
      this.setState({
        customers: response.data
      })
    });
  }
  toggleNewCustomerModal() {
    this.setState({
      NewCustomerModal: ! this.state.NewCustomerModal
    })
  }

  toggleeditCustomerModal() {
    this.setState({
      editCustomerModal: ! this.state.editCustomerModal
    })
  }

  addCustomer() {
    axios.post('https://marcusbassportfolioserver.herokuapp.com/customers', this.state.newCustomerData).then((response) => {
      let { customers } = this.state;

      customers.push(response.data);

      this.setState({
        customers, NewCustomerModal: false, newCustomerData: {
          email: '',
          first_name: '',
          last_name: '',
          ip: '',
          latitude: '',
          longitude: '',
          created_at: '',
          updated_at: ''
        }
      });
    });
  }
  UpdateCustomer() {
    let { email, first_name, last_name, ip, latitude, longitude, created_at, updated_at } = this.state.editCustomerData;
    
    axios.put('https://marcusbassportfolioserver.herokuapp.com/customers/' + this.state.editCustomerData.id, {
      email,
      first_name,
      last_name,
      ip,
      latitude,
      longitude,
      created_at,
      updated_at
    }).then((response) => {
      console.log(response.data);

      this.refreshCustomers();
      
      this.setState({
        editCustomerModal: false, editCustomerData: {
          id: '',
          email: '',
          first_name: '',
          last_name: '',
          ip: '',
          latitude: '',
          longitude: '',
          created_at: '',
          updated_at: ''
        }
      })
    })
  }

  editCustomer(id, email, first_name, last_name, ip, latitude, longitude, created_at, updated_at) {
    this.setState({
      editCustomerData: {
        id, email, first_name, last_name, ip, latitude, longitude, created_at, updated_at
      },
      editCustomerModal: !this.state.editCustomerModal
    });
  }

  deleteCustomer(id) {
    axios.delete('https://marcusbassportfolioserver.herokuapp.com/customers/' + id).then((response) => {
      this.refreshCustomers();
    })
  }

  refreshCustomers() {
    axios.get('https://marcusbassportfolioserver.herokuapp.com/customers').then((response) => {
      this.setState({
        customers: response.data
      })
    })
  }



  render() {

    let customers = this.state.customers.map((customers) => {
      return (
        <tr key={customers.id}>
          <td>{customers.id}</td>
          <td>{customers.email}</td>
          <td>{customers.first_name}</td>
          <td>{customers.last_name}</td>
          <td>{customers.ip}</td>
          <td>{customers.latitude}</td>
          <td>{customers.longitude}</td>
          <td>{customers.created_at}</td>
          <td>{customers.updated_at}</td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editCustomer.bind(this, customers.id, customers.email, customers.first_name, customers.last_name, customers.ip, customers.latitude, customers.longitude, customers.created_at, customers.updated_at )}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteCustomer.bind(this, customers.id)}>Delete</Button>

          </td>
        </tr>
      )
    });



    return (
      <div className="AppContainer">
        <div>         
          <div className="CustomerDatabaseHeader">
          <h1>Customer Database</h1>
          </div>
          <div className="Header">
        <Button className="my-3" color="primary" onClick={this.toggleNewCustomerModal.bind(this)}>Add New Customer</Button>
        </div>
      </div>
       
        <Modal isOpen={this.state.NewCustomerModal} toggle={this.toggleNewCustomerModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewCustomerModal.bind(this)}>Add Customer</ModalHeader>
          <ModalBody>           
            <FormGroup>      
              <Label for="email">Email</Label>
              <Input id="email" value={this.state.newCustomerData.email} onChange={(e) => {
                let { newCustomerData } = this.state;
                newCustomerData.email = e.target.value;
                this.setState({ newCustomerData });
              }} />              
            </FormGroup>

            <FormGroup>      
              <Label for="first_name">First Name</Label>
              <Input id="first_name" value={this.state.newCustomerData.first_name} onChange={(e) => {
                let { newCustomerData } = this.state;
                newCustomerData.first_name = e.target.value;
                this.setState({ newCustomerData });
              }}  />
            </FormGroup>

            <FormGroup>      
              <Label for="last_name">Last Name</Label>
              <Input id="last_name" value={this.state.newCustomerData.last_name} onChange={(e) => {
                let { newCustomerData } = this.state;
                newCustomerData.last_name = e.target.value;
                this.setState({ newCustomerData });
              }}  />
            </FormGroup>

            <FormGroup>      
              <Label for="ip">IP Address</Label>
              <Input id="ip" value={this.state.newCustomerData.ip} onChange={(e) => {
                let { newCustomerData } = this.state;
                newCustomerData.ip = e.target.value;
                this.setState({ newCustomerData });
              }}  />
            </FormGroup>

            <FormGroup>      
              <Label for="latitude">Latitude</Label>
              <Input id="latitude" value={this.state.newCustomerData.latitude} onChange={(e) => {
                let { newCustomerData } = this.state;
                newCustomerData.latitude = e.target.value;
                this.setState({ newCustomerData });
              }}  />
            </FormGroup>

            <FormGroup>      
              <Label for="longitude">Longitude</Label>
              <Input id="longitude" value={this.state.newCustomerData.longitude} onChange={(e) => {
                let { newCustomerData } = this.state;
                newCustomerData.longitude = e.target.value;
                this.setState({ newCustomerData });
              }}  />
            </FormGroup>

            <FormGroup>      
              <Label for="created_at">Created On</Label>
              <Input id="created_at" value={this.state.newCustomerData.creacted_at} onChange={(e) => {
                let { newCustomerData } = this.state;
                newCustomerData.created_at = e.target.value;
                this.setState({ newCustomerData });
              }}  />
            </FormGroup>

            <FormGroup>      
              <Label for="updated_at">Updated On</Label>
              <Input id="updated_at" value={this.state.newCustomerData.updated_at} onChange={(e) => {
                let { newCustomerData } = this.state;
                newCustomerData.updated_at = e.target.value;
                this.setState({ newCustomerData });
              }}  />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addCustomer.bind(this)}>Add Customer</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewCustomerModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editCustomerModal} toggle={this.toggleeditCustomerModal.bind(this)}>
          <ModalHeader toggle={this.toggleeditCustomerModal.bind(this)}>Edit Customer</ModalHeader>
          <ModalBody>           
            <FormGroup>      
              <Label for="email">Email</Label>
              <Input id="email" value={this.state.editCustomerData.email} onChange={(e) => {
                let { editCustomerData } = this.state;
                editCustomerData.email = e.target.value;
                this.setState({ editCustomerData });
              }} />              
            </FormGroup>

            <FormGroup>      
              <Label for="first_name">First Name</Label>
              <Input id="first_name" value={this.state.editCustomerData.first_name} onChange={(e) => {
                let { editCustomerData } = this.state;
                editCustomerData.first_name = e.target.value;
                this.setState({ editCustomerData });
              }}  />
            </FormGroup>

            <FormGroup>      
              <Label for="last_name">Last Name</Label>
              <Input id="last_name" value={this.state.editCustomerData.last_name} onChange={(e) => {
                let { editCustomerData } = this.state;
                editCustomerData.last_name = e.target.value;
                this.setState({ editCustomerData });
              }}  />
            </FormGroup>

            <FormGroup>      
              <Label for="ip">IP Address</Label>
              <Input id="ip" value={this.state.editCustomerData.ip} onChange={(e) => {
                let { editCustomerData } = this.state;
                editCustomerData.ip = e.target.value;
                this.setState({ editCustomerData });
              }}  />
            </FormGroup>

            <FormGroup>      
              <Label for="latitude">Latitude</Label>
              <Input id="latitude" value={this.state.editCustomerData.latitude} onChange={(e) => {
                let { editCustomerData } = this.state;
                editCustomerData.latitude = e.target.value;
                this.setState({ editCustomerData });
              }}  />
            </FormGroup>

            <FormGroup>      
              <Label for="longitude">Longitude</Label>
              <Input id="longitude" value={this.state.editCustomerData.longitude} onChange={(e) => {
                let { editCustomerData } = this.state;
                editCustomerData.longitude = e.target.value;
                this.setState({ editCustomerData });
              }}  />
            </FormGroup>

            <FormGroup>      
              <Label for="created_at">Created On</Label>
              <Input id="created_at" value={this.state.editCustomerData.created_at} onChange={(e) => {
                let { editCustomerData } = this.state;
                editCustomerData.created_at = e.target.value;
                this.setState({ editCustomerData });
              }}  />
            </FormGroup>

            <FormGroup>      
              <Label for="updated_at">Updated On</Label>
              <Input id="updated_at" value={this.state.editCustomerData.updated_at} onChange={(e) => {
                let { editCustomerData } = this.state;
                editCustomerData.updated_at = e.target.value;
                this.setState({ editCustomerData });
              }}  />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.UpdateCustomer.bind(this)}>Update Customer</Button>{' '}
            <Button color="secondary" onClick={this.toggleeditCustomerModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
            
        <Table id="CustomersTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>IP</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Created On</th>
              <th>Updated On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers}
          </tbody>
        </Table>
        <ReactToExcel
          className="ExportButton"
          table="CustomersTable"
          filename="CustomerDatabase"
          sheet="sheet 1"
          buttonText="Export to Excel"
          />
      </div>
    );
  }
}

export default App;
