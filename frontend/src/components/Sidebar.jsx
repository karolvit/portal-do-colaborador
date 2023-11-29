import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { FaHouse } from 'react-icons/fa6';
import { IoMdSettings } from 'react-icons/io';
import { FcCollaboration, FcSettings, FcAdvertising, FcPositiveDynamic, FcRating } from "react-icons/fc";
import './Sidebar.css';

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const isDropdownOpen = (index) => {
    return openDropdown === index;
  };


  const icons = [<FcAdvertising size={30} />, <FcPositiveDynamic size={30} />, <FcRating size={30} />, <FcSettings size={30} /> ];

  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink to="/home">
            <FaHouse size={22} />
            Home
          </NavLink>
        </li>
        {[0, 1, 2, 3].map((index) => (
          <li
            key={index}
            className={isDropdownOpen(index) ? 'open-dropdown' : ''}
            onClick={() => toggleDropdown(index)}
          >
            {icons[index]} {}
            <span>
              {index === 0
                ? 'Comunicação'
                : index === 1
                ? 'Avaliação de Desempenho'
                : index === 2
                ? 'Programa de Milhagens'
                : 'Configurações'}
              {isDropdownOpen(index) ? (
                <FaChevronUp className="up" />
              ) : (
                <FaChevronDown className="down" />
              )}
            </span>
            {isDropdownOpen(index) && (
              <ul className="dropdown open">
                {index === 0 && (
                  <>
                    <li>
                    <NavLink to="/novo/post" >
                      Enviar Publicações
                      </NavLink>
                    </li>
                    <li>Painel De Publicações</li>
                  </>
                )}
                {index === 1 && (
                  <>
                    <li>Cadastro</li>
                    <li>Relatórios</li>
                  </>
                )}
                {index === 2 && (
                  <>
                    <li>Regras</li>
                    <li>Ranking</li>
                  </>
                )}
                {index === 3 && (
                  <>
                    <li>Empresa</li>
                    <li>Centro de Custo</li>
                    <li>Organograma</li>
                    <li>Usuários</li>
                  </>
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;