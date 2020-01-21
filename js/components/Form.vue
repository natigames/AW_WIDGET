<template>
	<div id="report-form">
		<ul class="nav nav-tabs mb-4">
			<li class="nav-item">
				<span class="nav-link" :class="{active: newReport}" @click="newReport = true">{{ label_formtab_new }}</span>
			</li>
			<li class="nav-item">
				<span class="nav-link" :class="{active: !newReport}" @click="newReport = false">{{ label_formtab_recover }}</span>
			</li>
		</ul>
		<form @submit.prevent="getReport" class="text-left">
			<div id="creditcode_container" class="border border-top-0 border-left-0 border-right-0 mb-2">
				<div class="form-group row align-items-end">
					<label for="creditcode" class="col-sm-4">{{ label_credit_code }}:</label>
					<input type="text" name="creditcode" id="creditcode" class="form-control col-sm-8 mx-2 mx-sm-0" :placeholder="placeholder_input_creditcode" v-model="creditcode">
				</div>
				<div id="inv-cc" class="d-none row mt-2">
					<div class="col-sm-4"></div>
					<div class="alert alert-danger col-sm-8">{{ error_bad_credit_code }}</div>
				</div>
			</div>
			<template v-if="newReport">
				<template v-if="$parent.product && $parent.product.metadata.indexOf('profileid') != -1">
					<h4 class="person1-title text-center">{{ heading_person1 }}</h4>
				</template>
				<div class="form-group row align-items-end">
					<label for="firstname" class="col-sm-4">{{ label_first_name }}:</label>
					<input type="text" name="firstname" class="form-control col-sm-8 mx-2 mx-sm-0" :placeholder="placeholder_input_first_name" :value="$parent.$parent.params.default_user_data.firstname" required @input="invalidMsg($event)" @invalid="invalidMsg($event)">
				</div>
				<template v-if="$parent.product && $parent.product.metadata && $parent.product.metadata.indexOf('lastname') != -1">
					<div class="form-group row align-items-end">
						<label for="lastname" class="col-sm-4">{{ label_last_name }}:</label>
						<input type="text" name="lastname" class="form-control col-sm-8 mx-2 mx-sm-0" :placeholder="placeholder_input_last_name" :value="$parent.$parent.params.default_user_data.lastname" required @input="invalidMsg($event)" @invalid="invalidMsg($event)">
					</div>
				</template>
				<div class="form-group row align-items-end">
					<label for="email" class="col-sm-4">{{ label_email }}:</label>
					<input type="email" name="email" class="form-control col-sm-8 mx-2 mx-sm-0" :placeholder="placeholder_input_email" :value="$parent.$parent.params.default_user_data.email" required @input="invalidMsg($event)" @invalid="invalidMsg($event)">
				</div>
				<div class="form-group row align-items-end">
					<label for="birthdate" class="col-sm-4">{{ label_birthdate1 }}:</label>
					<!--<input type="text" name="birthdate" class="form-control col-sm-8" placeholder="yyyy/mm/dd HH:MM" :value="$parent.$parent.params.default_user_data.birthdate" required pattern="[1-2][9|0][0-9][0-9]\/[0|1][0-9]\/[0-3][0-9] [0-2][0-9]:[0-5][0-9]">-->
					<DateTimePicker name="birthdate" ref="birthdate"></DateTimePicker>
				</div>
				<div class="form-group row align-items-end">
					<label for="placename" class="col-sm-4">{{ label_birthplace }}:</label>
					<input type="text" name="placename" class="form-control col-sm-8 mx-2 mx-sm-0" :value="$parent.$parent.params.default_user_data.birthplace" :placeholder="placeholder_input_birthplace" required @input="invalidMsg($event)" @invalid="invalidMsg($event)">
				</div>
				<template v-if="$parent.product && $parent.product.metadata.indexOf('profileid') != -1">
					<h4 class="person2-title text-center">{{ heading_person2 }}</h4>				
					<div class="form-group row align-items-end">
						<label for="p2_firstname" class="col-sm-4">{{ label_first_name }}:</label>
						<input type="text" name="p2_firstname" class="form-control col-sm-8 mx-2 mx-sm-0" :placeholder="placeholder_input_first_name2" :value="$parent.$parent.params.default_user_data.p2_name" required pattern="([a-zA-Z]+\s?\b){2,}" @input="invalidMsg($event)" @invalid="invalidMsg($event)">
					</div>
					<div class="form-group row align-items-end">
						<label for="p2_email" class="col-sm-4">{{ label_email }}:</label>
						<input type="email" name="p2_email" class="form-control col-sm-8 mx-2 mx-sm-0" :placeholder="placeholder_input_email2" :value="$parent.$parent.params.default_user_data.p2_email" required @input="invalidMsg($event)" @invalid="invalidMsg($event)">
					</div>
					<div class="form-group row align-items-end">
						<label for="p2_birthdate" class="col-sm-4">{{ label_birthdate1 }}:</label>
						<!--<input type="text" name="p2_birthdate" class="form-control col-sm-8" placeholder="yyyy/mm/dd HH:MM" :value="$parent.$parent.params.default_user_data.birthdate" required pattern="[1-2][9|0][0-9][0-9]\/[0|1][0-9]\/[0-3][0-9] [0-2][0-9]:[0-5][0-9]">-->
						<DateTimePicker name="p2_birthdate" ref="p2_birthdate"></DateTimePicker>
					</div>
					<div class="form-group row align-items-end">
						<label for="p2_placename" class="col-sm-4 mx-2 mx-sm-0">{{ label_birthplace }}:</label>
						<input type="text" name="p2_placename" class="form-control col-sm-8 mx-2 mx-sm-0" :value="$parent.$parent.params.default_user_data.p2_birthplace" :placeholder="placeholder_input_birthplace" required @input="invalidMsg($event)" @invalid="invalidMsg($event)">
					</div>
				</template>
				<template v-if="$parent.product && $parent.product.metadata && ($parent.product.metadata.indexOf('placename') != -1 || $parent.product.metadata.indexOf('repyear') != -1)">
					<h4 class="metafields-title text-center">{{ heading_metafields }}</h4>
				</template>
				<template v-if="$parent.product && $parent.product.metadata.indexOf('placename') != -1">
					<div class="form-group row align-items-end">
						<label for="meta_placename" class="col-sm-4">{{ label_meta_place }}:</label>
						<input type="text" name="meta_placename" class="form-control col-sm-8 mx-2 mx-sm-0" :placeholder="placeholder_input_birthplace" :value="$parent.$parent.params.default_user_data.meta_place" required @input="invalidMsg($event)" @invalid="invalidMsg($event)">
					</div>
				</template>
				<template v-if="$parent.product && $parent.product.metadata.indexOf('repyear') != -1">
					<div class="form-group row align-items-end">
						<label for="repyear" class="col-sm-4">{{ label_date_year }}:</label>
						<select name="repyear" class="form-control col-sm-8 mx-2 mx-sm-0" required>
							<option v-for="year in repyears" :value="year" :selected="(!$parent.$parent.params.default_user_data.meta_repyear && year == (new Date()).getFullYear()) || ($parent.$parent.params.default_user_data.meta_repyear == year)">{{ year }}</option>
						</select>
					</div>	
				</template>
				<template v-if="$parent.product && $parent.product.metadata.indexOf('repmonth') != -1">
					<div class="form-group row align-items-end">
						<label for="repmonth" class="col-sm-4">{{ label_date_month }}:</label>
						<select name="repmonth" class="form-control col-sm-8 mx-2 mx-sm-0" required>
							<option v-for="month in 12" :value="month" :selected="(!$parent.$parent.params.default_user_data.meta_repmonth && month == (new Date()).getMonth() + 1) || ($parent.$parent.params.default_user_data.meta_repmonth == month)">{{ getMonthName(month) }}</option>
						</select>
					</div>	
				</template>
			</template>
			<div class="form-group row">
				<input type="submit" class="btn btn-success col-12" :value="button_submit_form"> 
			</div>
		</form>
		<div id="messagebox" class="d-none justify-content-center align-items-center">
			<div class="d-flex p-4">
				<p class="mt-4">{{ message }}</p>
				<button class="d-none btn btn-sm btn-info" @click="dismissMessagebox">OK</button>
			</div>
		</div>
	</div>
</template>

<script>
import DateTimePicker from './DateTimePicker.vue';

export default {
	data: function() {
		return {
			newReport: true,
			creditcode: '',
			message: '',
			person1: null,
			person2: null,
			repyears: [],

			//translations
			label_formtab_recover: ASTROWEB_CONFIG.translate('label_formtab_recover'),
			label_formtab_new: ASTROWEB_CONFIG.translate('label_formtab_new'),
			label_credit_code: ASTROWEB_CONFIG.translate('label_credit_code'),
			placeholder_input_creditcode: ASTROWEB_CONFIG.translate('placeholder_input_creditcode'),
			error_bad_credit_code: ASTROWEB_CONFIG.translate('error_bad_credit_code'),
			label_first_name: ASTROWEB_CONFIG.translate('label_first_name'),
			placeholder_input_first_name: ASTROWEB_CONFIG.translate('placeholder_input_first_name'),
			label_last_name: ASTROWEB_CONFIG.translate('label_last_name'),
			placeholder_input_last_name: ASTROWEB_CONFIG.translate('placeholder_input_last_name'),
			label_email: ASTROWEB_CONFIG.translate('label_email'),
			placeholder_input_email: ASTROWEB_CONFIG.translate('placeholder_input_email'),
			label_birthdate1: ASTROWEB_CONFIG.translate('label_birthdate1'),
			label_birthplace: ASTROWEB_CONFIG.translate('label_birthplace'),
			placeholder_input_birthplace: ASTROWEB_CONFIG.translate('placeholder_input_birthplace'),
			heading_metafields: ASTROWEB_CONFIG.translate('heading_metafields'),
			label_meta_place: ASTROWEB_CONFIG.translate('label_meta_place'),
			label_date_year: ASTROWEB_CONFIG.translate('label_date_year'),
			label_date_month: ASTROWEB_CONFIG.translate('label_date_month'),
			heading_person1: ASTROWEB_CONFIG.translate('heading_person1'),
			heading_person2: ASTROWEB_CONFIG.translate('heading_person2'),
			placeholder_input_first_name2: ASTROWEB_CONFIG.translate('placeholder_input_first_name'),
			placeholder_input_email2: ASTROWEB_CONFIG.translate('placeholder_input_email2'),
			button_submit_form: ASTROWEB_CONFIG.translate('button_submit_form'),
		};	
	},
	components: {
		DateTimePicker,
	},
	created() {
		this.populateRepYears();
	},
	mounted() {
		if(this.newReport) {
			this.bindGooglePlaces();	
		}
		/*axios.get("https://astroweb.mx/tools/" + ASTROWEB_CONFIG.token + "/getSettings/0", this.$parent.$parent.$parent.config)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
			});*/

	},
	methods: {
		bindGooglePlaces() {
			window.setTimeout(function() {
				//Initialize Place Google Places for Place field
				let placeField = $("input[name='placename']")[0];
				new google.maps.places.Autocomplete(placeField, {
					types: ['(cities)'],
				});
				let p2_placeField = $("input[name='p2_placename']")[0];
				if(p2_placeField) {
					new google.maps.places.Autocomplete(p2_placeField, {
						types: ['(cities)'],
					});
				}
				let meta_placename = $("input[name='meta_placename']")[0];
				if(meta_placename) {
					new google.maps.places.Autocomplete(meta_placename, {
						types: ['(cities)'],
					});
				}

			}, 1000);
		},
		invalidMsg(evt) {
			let target = evt.target;

			if(target.name == "firstname") {
				if(target.value === "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_required_first_name'));
				} else if(target.validity.patternMismatch) {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_invalid_pattern_first_name'));
				} else {
					target.setCustomValidity('');
				}
			} else if(target.name == "lastname") {
				if(target.value === "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_required_last_name'));
				} else if(target.validity.patternMismatch) {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_invalid_pattern_last_name'));
				} else {
					target.setCustomValidity('');
				}
			} else if(target.name == "email") {
				if(target.value === "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_required_email'));
				} else if(target.validity.typeMismatch) {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_invalid_email'));
				} else {
					target.setCustomValidity('');
				}
			} else if(target.name == "hour1" || target.name == "hour2") {
				if(target.value == "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_required_hour'));
				} else {
					target.setCustomValidity('');
				}
			} else if(target.name == "minute1" || target.name == "minute2"){
				if(target.value == "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_required_minute'));
				} else {
					target.setCustomValidity('');
				}
			} else if(target.name == "date_[year]") {
				if(target.value == "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_required_year'));
				} else {
					target.setCustomValidity('');
				}
			} else if(target.name == "date_[month]") {
				if(target.value == "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_required_month'));
				} else {
					target.setCustomValidity('');
				}
			} else if(target.name == "date_[day]") {
				if(target.value == "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_required_day'));
				} else {
					target.setCustomValidity('');
				}
			} else if(target.name == "placename") {
				if(target.value == "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_required_birthplace'));
				} else {
					target.setCustomValidity('');
				}
			} else if(target.name == "meta_placename") {
				if(target.value == "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_meta_placename'));
				} else {
					target.setCustomValidity('');
				}
			} else if(target.name == "p2_firstname") {
				if(target.value === "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_required_first_name2'));
				} else if(target.validity.patternMismatch) {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_invalid_pattern_first_name2'));
				} else {
					target.setCustomValidity('');
				}
			} else if(target.name == "p2_email") {
				if(target.value === "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_required_email2'));
				} else if(target.validity.typeMismatch) {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_invalid_email2'));
				} else {
					target.setCustomValidity('');
				}
			} else if(target.name == "p2_placename") {
				if(target.value == "") {
					target.setCustomValidity(ASTROWEB_CONFIG.translate('validation_msg_required_birthplace2'));
				} else {
					target.setCustomValidity('');
				}
			}

			return true;
		},
		getReport(event) {
			//api calls (Profiles.post, Credits.get, Reports.post)
			//let fd = new FormData($("#astroweb-newuser-form")[0]);
			this.message = "Loading...";
			$(event.target).parents("#messagebox")
			//$("#messagebox")
				.removeClass("d-none")
				.addClass("d-flex");

			if(!this.newReport && this.creditcode) {
				//recover report
				//this.$parent.$parent.params.creditcode = this.creditcode;
				this.$parent.$parent.creditcode = this.creditcode;
				this.$parent.creditcodeProvidedByUser = true;
				this.$emit('change-page', 'Report');
			} else {
				//new report
				this.person1 = {
					"email": $(event.target).find("input[name='email']").val(),
					"firstname": $(event.target).find("input[name='firstname']").val(),
					"placename": $(event.target).find("input[name='placename']").val(),
					//"birthdate": $(event.target).find("input[name='birthdate']").val(),
					"birthdate": this.$refs.birthdate.val,
				};
				
				if(this.$parent.product && this.$parent.product.metadata.indexOf('profileid') != -1){
					this.person2 = {
						"email": $(event.target).find("input[name='p2_email']").val(),
						"firstname": $(event.target).find("input[name='p2_firstname']").val(),
						"placename": $(event.target).find("input[name='p2_placename']").val(),
						//"birthdate": $(event.target).find("input[name='p2_birthdate']").val(),
						"birthdate": this.$refs.p2_birthdate.val,
					};
				}
				if(this.$parent.product && this.$parent.product.metadata.indexOf('lastname') != -1){
					this.$parent.postmeta.lastname = $(event.target).find("input[name='lastname']").val();
				}
				if(this.$parent.product && this.$parent.product.metadata.indexOf('placename') != -1){
					this.$parent.postmeta.placename = $(event.target).find("input[name='meta_placename']").val();
				}
				if(this.$parent.product && this.$parent.product.metadata.indexOf('repyear') != -1){
					this.$parent.postmeta.repyear = $(event.target).find("select[name='repyear']").val();
				}
				if(this.$parent.product && this.$parent.product.metadata.indexOf('repmonth') != -1){
					this.$parent.postmeta.repmonth = $(event.target).find("select[name='repmonth']").val();
				}
				axios.post("https://astroweb.mx/rest/aw/profiles/" + ASTROWEB_CONFIG.token, this.person1, this.$parent.$parent.$parent.config)
					.then((response) => {
						//console.log(response);
						if(response.data.errordata) {
							//alert(response.data.errordata.message);
							this.message = response.data.errordata.message;
							$(event.target).parents("#messagebox").find("button")
							/*$("#messagebox button")*/.removeClass("d-none");
							return;
						} 
						let profileid = response.data.data.profile.profileid;
						//console.log(profileid);
						this.$parent.$parent.params.default_user_data.profileid = profileid;
						if(ASTROWEB_CONFIG.Twostep) {
							//Display demo report
							//this.$parent.$parent.params.creditcode = 0;
							this.$parent.$parent.creditcode = 0;
							this.$emit('change-page', 'Report');
						} else {
							//One step
							if(this.creditcode) {
								let creditcode = this.creditcode;
								//this.$parent.$parent.params.creditcode = creditcode;
								this.$parent.$parent.creditcode = creditcode;
								if(this.$parent.product && this.$parent.product.metadata.indexOf('profileid') != -1){
									//get profileid of second person
									axios.post("https://astroweb.mx/rest/aw/profiles/" + ASTROWEB_CONFIG.token, this.person2, this.$parent.$parent.$parent.config)
										.then((response) => {
											if(response.data.errordata) {
												alert(response.data.errordata.message);
												this.message = response.data.errordata.message;
												$(event.target).parents("#messagebox").find("button")
												/*$("#messagebox button")*/.removeClass("d-none");
											} else {
												profileid = response.data.data.profile.profileid;
												this.$parent.postmeta.profileid = profileid;
												this.$emit('change-page', 'Report');
											}
										})
										.catch((error) => {
											console.error(error);
										});
									
								} else {
									this.$emit('change-page', 'Report');
								}									
							} else {
								//Get creditcode and redirect to report page
								axios.get("https://astroweb.mx/rest/aw/credits/" + ASTROWEB_CONFIG.token + "/" + this.$parent.product.prodid, this.$parent.$parent.$parent.config)
									.then((response) => {
										//console.log(response);
										if(response.data.errordata) {
											alert(response.data.errordata.message);
											this.message = response.data.errordata.message;
											$(event.target).parents("#messagebox").find("button")
											/*$("#messagebox button")*/.removeClass("d-none");
										} else {
											let creditcode = response.data.data.creditcode;
											//this.$parent.$parent.params.creditcode = creditcode;
											this.$parent.$parent.creditcode = creditcode;
											if(this.$parent.product && this.$parent.product.metadata.indexOf('profileid') != -1){
												//get profileid of second person
												axios.post("https://astroweb.mx/rest/aw/profiles/" + ASTROWEB_CONFIG.token, this.person2, this.$parent.$parent.$parent.config)
													.then((response) => {
														if(response.data.errordata) {
															alert(response.data.errordata.message);
															this.message = response.data.errordata.message;
															$(event.target).parents("#messagebox").find("button")
															/*$("#messagebox button")*/.removeClass("d-none");
														} else {
															profileid = response.data.data.profile.profileid;
															this.$parent.postmeta.profileid = profileid;
															this.$emit('change-page', 'Report');
														}
													})
													.catch((error) => {
														console.error(error);
													});
												
											} else {
												this.$emit('change-page', 'Report');
											}									
										}

									})
									.catch((error) => {
										console.error(error);
									});
							}
						}
					})
					.catch((error) => {
						console.error(error);
						//console.error(error.response.data);
					});
			}

		},
		dismissMessagebox(event) {
			$(event.target).parents("#messagebox")
				.removeClass("d-flex")
				.addClass("d-none");
			this.message = "";
		},
		getMonthName(monthNum) {
			return ASTROWEB_CONFIG.translate('labels_date_months')[monthNum - 1];
		},
		populateRepYears() {
			//populate repyears for dropdown
			let currYear = (new Date()).getFullYear();
			let repyears = [];
			repyears.push(currYear - 2);
			repyears.push(currYear - 1);
			repyears.push(currYear);
			repyears.push(currYear + 1);
			repyears.push(currYear + 2);

			this.repyears = repyears;
		},
	},
	watch: {
		newReport: function(newVal, oldVal) {
			if(newVal) {
				this.bindGooglePlaces();
			}
		}
	},
}
</script>

<style lang="scss" scoped>
input[disabled='disabled'] {
	background-color: grey !important;
	cursor: not-allowed;
}

#messagebox {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background-color: rgba(0,0,0,0.7);
	div {
		background-color: #fff;
		position: relative;
		button {
			position: absolute;
			right: 6px;
			bottom: 6px;
		}
	}
}

.nav-link {
	cursor: pointer;
}
</style>

<style>
.pac-container {
	z-index: 1051 !important;
}
</style>
