var sn = 0;
    var data = [];
    
    $(document).ready(function(){
      $("form").submit(function(event){         //2. On submit populate data in table. 
        event.preventDefault();
        
        
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var name = fname.concat(" ",lname);
        
        var contact = $("#contact").val();
        if(name == "" || contact == ""){
          alert("All fields are mandatory!");
          return;
        }
        if(data.find(x => x.name == name) || data.find(x => x.contact == contact)){    //3. Person's name and contact number should be unique, duplicates are not allowed. 
          alert("Name or contact number already exists!");
          return;
        }
        data.push({sn: ++sn, name: name, contact: contact});
        populateTable();
        $("form")[0].reset();
      });

      $(document).on("click", ".del", function(){                                     //6. provide delete functionality with alert . 
        var delIndex = $(this).closest("tr").index();
        data.splice(delIndex, 1);
        populateTable();
        alert("Deleted Successfully!");
      });

      $(document).on("click", ".name", function(){                 //7. Implement sort by name (When someone clicks on Name column).
        
        data.sort(function(a, b){
          var nameA = a.name.toLowerCase();
          var nameB = b.name.toLowerCase();
          if(nameA < nameB) return -1;
          if(nameA > nameB) return 1;
          return 0;
        });
        populateTable();
      });

      $("#search").on("keyup", function(){                      //5. Provide search by name. 
        var searchVal = $(this).val().toLowerCase();
        var searchData = data.filter(function(val){
          return val.name.toLowerCase().indexOf(searchVal) > -1;
        });
        populateTable(searchData);
      });

      function populateTable(dataToPopulate){
        var table = $("table tbody");
        table.html("");
        dataToPopulate = dataToPopulate || data;
        dataToPopulate.forEach(function(val){
          table.append("<tr><td>"+val.sn+"</td><td class='name'>"+val.name+"</td><td>"+val.contact+"</td><td><button class='del'>x</button></td></tr>");
        });
      }
    });