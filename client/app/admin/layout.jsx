'use client'

import Link from "next/link"
import { useContext } from "react"
import UserContext from "../context/userContext"

export default function AdminLayout({ children }) {
  const { user } = useContext(UserContext)

  return (
    <div>
      <div id="wrapper">
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Locação de Imóveis</div>
          </a>

          <hr className="sidebar-divider my-0" />

          <li className="nav-item active">
            <Link className="nav-link" href="/admin">
              <i className="fas fa-home"></i>
              <span>Início</span>
            </Link>
          </li>

          <hr className="sidebar-divider" />

          <div className="sidebar-heading">Menu</div>
          <li className="nav-item">
            <Link className="nav-link" href="/admin/usuarios">
              <i className="fas fa-user"></i>
              <span>Usuários</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" href="/admin/imoveis">
              <i className="fas fa-home"></i>
              <span>Imóveis</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/admin/contratos">
              <i className="fas fa-file-contract"></i>
              <span>Contratos</span>
            </Link>
          </li>
        </ul>

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                <i className="fa fa-bars"></i>
              </button>

              <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>

                <li className="nav-item dropdown no-arrow">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.nome}</span>
                    <img className="img-profile rounded-circle" src="/images/user.jpg" />
                  </a>

                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>

            <div className="container-fluid">
              <div style={{ minHeight: 800 }}>{children}</div>
            </div>
          </div>

          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Your Website 2021</span>
              </div>
            </div>
          </footer>
        </div>
      </div>

      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>

      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Pronto para sair?
              </h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Clique no botão "logout" abaixo para sair do sistema</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">
                Cancelar
              </button>
              <button className="btn btn-primary">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
