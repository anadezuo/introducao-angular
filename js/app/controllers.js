/*  Anotações
    
    Directivas
    - Temos a diretiva ng-bind, que pode ser utilizada para consultar
    valores no controller, ao invés de pegar o valor direto com interpolação.
    Como o Angular pode levar um tempinho para ser carregado, o valor
    pego com interpolação podem aparecer entre colchetes {{}}, enquanto que com ng-bind,\
    esse valor só aparecerá quando o Angular for carregado.
    Outra opção é carregar o Angular no <head/> (deixa pesado - melhor deixar os scripts embaixo).

    */

angular.module('myModule').controller('indexController', function ($scope) {
  $scope.title = 'Sistema com Angular JS';
  $scope.students = [
    {
      _id: 0,
      name: 'Diana',
      email: 'diana@email.com',
      firstNote: 85,
      secondNote: 80,
      thirdNote: 100,
    },
    {
      _id: 1,
      name: 'Laura',
      email: 'laura@email.com',
      firstNote: 100,
      secondNote: 80,
      thirdNote: 55,
    },
    {
      _id: 2,
      name: 'Paulo',
      email: 'paulo@email.com',
      firstNote: 65,
      secondNote: 90,
      thirdNote: 99,
    },
    {
      _id: 3,
      name: 'Pedro',
      email: 'pedro@email.com',
      firstNote: 35,
      secondNote: 60,
      thirdNote: 55,
    },
    {
      _id: 4,
      name: 'Sofia',
      email: 'sofia@email.com',
      firstNote: 35,
      secondNote: 50,
      thirdNote: 80,
    },
  ];

  $scope.isEdit = false;

  var init = function () {
    $scope.students.forEach(function (student) {
      student.average = average(student);
    });
    cleanFormData();
  };

  function parseNote(note) {
    return note ? parseFloat(note) : 0;
  }

  var average = function (Student) {
    var average =
      (parseNote(Student.firstNote) +
        parseNote(Student.secondNote) +
        parseNote(Student.secondNote)) /
      3;
    return average.toFixed(2);
  };

  // var elem = document.querySelector('#addStudentModal')
  // var instance = M.Modal.getInstance(elem)

  // $scope.average = function(Student){
  //   var average = (Student.firstNote + Student.secondNote + Student.thirdNote) / 3;
  //   return average.toFixed(2);
  // };

  var getInstanceAddStudentModal = function () {
    var elem = document.querySelector('#addStudentModal');
    return M.Modal.getInstance(elem);
  };

  var openAddStudentModal = async function () {
    var instance = await getInstanceAddStudentModal();
    instance.open();
  };

  var closeAddStudentModal = async function () {
    var instance = await getInstanceAddStudentModal();
    instance.close();
  };

  $scope.addStudent = async function () {
    cleanFormData();
    $scope.isEdit = false;
    openAddStudentModal();
  };

  $scope.editStudentModal = async function (Student) {
    cleanFormData();
    $scope.isEdit = true;
    //$scope.Student = { ...Student }
    angular.copy(Student, $scope.Student);
    openAddStudentModal();
  };

  $scope.saveStudent = function (Student) {
    Student.average = average(Student);
    if (!$scope.isEdit) {
      //Student.average = average(Student)
      Student._id = Math.random().toString(36).substr(2, 9);
      $scope.students.push(Student);
    } else {
      var index = $scope.students.findIndex(({ _id }) => _id === Student._id);
      $scope.students[index] = Student;
    }
    closeAddStudentModal();
  };

  $scope.deleteStudent = function (Student) {
    var index = $scope.students.findIndex(({ _id }) => _id === Student._id);
    $scope.students.pop(index);
  };

  var cleanFormData = function () {
    $scope.Student = {}; //? apagando registro, assim mesmo? Os campos ficam em verdinho como se tivesse valor
  };

  init();
});
