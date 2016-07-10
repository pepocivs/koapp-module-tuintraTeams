angular
  .controller('tuintrateamsCtrl', loadFunction);

loadFunction.$inject = ['$http','$scope', 'structureService', '$location', '$filter'];

function loadFunction($http, $scope, structureService, $location, $filter){

  structureService.registerModule($location, $scope, "tuintrateams");

  $scope.isBusy = true;

  var moduleConfig = $scope.tuintrateams.modulescope;
  if(!moduleConfig.clubDomain || moduleConfig.clubDomain === ''){
    showError('tuintrateams.error-not-set');
  } else {
    var params = {};
    if (moduleConfig.teamId)      params.teamId      = moduleConfig.teamId;
    if (moduleConfig.clubTeams)   params.clubTeams   = moduleConfig.clubTeams;
    if (moduleConfig.showMembers) params.showMembers = moduleConfig.showMembers;

    $http.get('http://pepocivs.com:4000/public/'+moduleConfig.clubDomain+'/getTeams', {params})
    .success(function(data){
      $scope.teams = prepareData(data);
      $scope.isBusy = false;
    }).error(function(){
      showError('tuintrateams.error-loading');
    });
  }

  function showError(message) {
    $scope.error = $filter('translate')(message);
    $scope.isBusy = false;
  }

  function prepareData(data) {
    data.forEach(function(player) {
      player.birthDate = moment(player.birthDate).format('DD/MM/YYYY');
    });
    return data;
  }

}
