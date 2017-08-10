import { Todos } from './../../providers/todos/todos';
import { Component } from "@angular/core";
import { NavController, AlertController } from 'ionic-angular';

 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  todos: any;
 
  constructor(public navCtrl: NavController, public todoService: Todos, public alertCtrl: AlertController) {
 
  }
 
  ionViewDidLoad(){
    this.todoService.getTodos().then((data) => {
      this.todos = data;
    });
  }
 
  createTodo(){
    let prompt = this.alertCtrl.create({
      title: 'Novo',
      message: 'O que você precisa fazer?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Salvar',
          handler: data => {
            this.todoService.createTodo({title: data.title});
          }
        }
      ]
    });
 
    prompt.present();
  }
 
  updateTodo(todo){
    let prompt = this.alertCtrl.create({
      title: 'Editar',
      message: 'Mudou de ideia?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Salvar',
          handler: data => {
            this.todoService.updateTodo({
              _id: todo._id,
              _rev: todo._rev,
              title: data.title
            });
          }
        }
      ]
    });
 
    prompt.present();
  }
 
  deleteTodo(todo){
    this.todoService.deleteTodo(todo);
  }
 
}