let cargoList = [
    { id: "CARGO001", name: "Строительные материалы", status: "В пути", origin: "Москва", destination: "Казань", departureDate: "2024-11-24" },
    { id: "CARGO002", name: "Хрупкий груз", status: "Ожидает отправки", origin: "Санкт-Петербург", destination: "Екатеринбург", departureDate: "2024-11-26" }
  ];
  
  function displayCargoList() {
    const tableBody = document.getElementById('cargoList');
    tableBody.innerHTML = '';
    
    cargoList.forEach((cargo, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${cargo.id}</td>
        <td>${cargo.name}</td>
        <td class="status-${cargo.status === 'Ожидает отправки' ? 'yellow' : cargo.status === 'В пути' ? 'blue' : 'green'}">${cargo.status}</td>
        <td>${cargo.origin}</td>
        <td>${cargo.destination}</td>
        <td>${cargo.departureDate}</td>
        <td>
          <select class="form-control" onchange="changeStatus(${index}, this)">
            <option value="Ожидает отправки" ${cargo.status === "Ожидает отправки" ? 'selected' : ''}>Ожидает отправки</option>
            <option value="В пути" ${cargo.status === "В пути" ? 'selected' : ''}>В пути</option>
            <option value="Доставлен" ${cargo.status === "Доставлен" ? 'selected' : ''}>Доставлен</option>
          </select>
          <button class="btn btn-danger mt-2" onclick="deleteCargo(${index})">Удалить</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function changeStatus(index, select) {
    const newStatus = select.value;
    const departureDate = new Date(cargoList[index].departureDate);
    const currentDate = new Date();
  
    if (newStatus === "Доставлен" && departureDate > currentDate) {
      alert("Невозможно установить статус 'Доставлен', если дата отправления находится в будущем.");
      select.value = cargoList[index].status;
      return;
    }
  
    cargoList[index].status = newStatus;
    displayCargoList();
  }
  
  function deleteCargo(index) {
    cargoList.splice(index, 1);
    displayCargoList();
  }
  
  document.getElementById('cargoForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('cargoName').value;
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departureDate').value;
    const status = document.getElementById('status').value;
  
    if (!name || !origin || !destination || !departureDate) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }
  
    const newCargo = {
      id: `CARGO${('000' + (cargoList.length + 1)).slice(-4)}`,
      name: name,
      status: status,
      origin: origin,
      destination: destination,
      departureDate: departureDate
    };
  
    cargoList.push(newCargo);
    displayCargoList();
  });
  
  document.getElementById('statusFilter').addEventListener('change', function() {
    const filter = this.value;
    if (filter) {
      cargoList = cargoList.filter(cargo => cargo.status === filter);
    } else {
      cargoList = [
        { id: "CARGO001", name: "Строительные материалы", status: "В пути", origin: "Москва", destination: "Казань", departureDate: "2024-11-24" },
        { id: "CARGO002", name: "Хрупкий груз", status: "Ожидает отправки", origin: "Санкт-Петербург", destination: "Екатеринбург", departureDate: "2024-11-26" }
      ];
    }
    displayCargoList();
  });
  
  displayCargoList();
  