
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  usuarios: Usuario[] = [];
  nome = '';
  email = '';
  editando: Usuario | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.http.get<Usuario[]>('http://localhost:3000/usuarios')
      .subscribe(data => this.usuarios = data);
  }

  salvar() {
    if (this.editando) {
      this.http.put(`http://localhost:3000/usuarios/${this.editando.id}`, {
        nome: this.nome,
        email: this.email
      }).subscribe(() => {
        this.carregarUsuarios();
        this.cancelar();
      });
    } else {
      this.http.post('http://localhost:3000/usuarios', {
        nome: this.nome,
        email: this.email
      }).subscribe(() => {
        this.carregarUsuarios();
        this.nome = '';
        this.email = '';
      });
    }
  }

  editar(usuario: Usuario) {
    this.editando = usuario;
    this.nome = usuario.nome;
    this.email = usuario.email;
  }

  cancelar() {
    this.editando = null;
    this.nome = '';
    this.email = '';
  }

  deletar(id: number) {
    this.http.delete(`http://localhost:3000/usuarios/${id}`)
      .subscribe(() => this.carregarUsuarios());
  }
}
