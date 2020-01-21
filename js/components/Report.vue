<template>
	<div id="report" class="text-left">
		<template v-if="error">
			<div class="alert alert-danger">{{ error }}</div>
			<button class="btn btn-sm btn-info w-100" @click="$emit('change-page', 'Form')">OK</button>
		</template>
		<template v-if="loading">
			<div class="text-center alert alert-info">Loading...</div>
		</template>
		<template v-else-if="report">
			<div class="report-chapter" v-if="pagination && currentChapter < report.length">
				<h3 class="chapter-title">{{ report[currentChapter].chapter }}</h3>
				<div class="chapter-section" v-for="section in report[currentChapter].data">
					<h4 class="section-title">{{ section.aspect }}</h4>
					<img v-if="displayReportImages && section.image" :src="section.image" class="ml-2 mb-2 float-right">
					<p v-for="text in section.text">{{ text }}</p>
				</div>

			</div>
			<div class="report-chapter" v-else-if="!pagination" v-for="chapter in report">
				<h3 class="chapter-title">{{ chapter.chapter }}</h3>
				<div class="chapter-section" v-for="section in chapter.data">
					<h4 class="section-title">{{ section.aspect }}</h4>
					<img v-if="displayReportImages && section.image" :src="section.image" class="ml-2 mb-2 float-right">
					<p v-for="text in section.text">{{ text }}</p>
				</div>
			</div>
			<div v-if="wheel && (!pagination || (pagination && currentChapter == report.length))" class="wheel text-center">
				<img id="wheel" :src="wheel">
			</div>
			<template v-if="(!pagination) || (pagination && ((wheel && currentChapter == report.length + 1) || (!wheel && currentChapter == report.length)))">
				<div v-if="tech" class="tech-summary text-center mx-2 row">
					<h4 class="text-center mt-4 col-12">Technical Summary</h4>
					<h5 class="col-12">{{ summary.firstname }}</h5>
					<table class="table-type-1 table border text-left mt-4 col-lg-7">
						<thead>
							<tr class="">
								<template v-for="(colname, index) in tech.table.block1[0]">
									<th class="border border-dark">{{ colname }}</th>
								</template>
							</tr>
						</thead>
						<tbody>
							<tr v-if="row_index > 0" v-for="(row, row_index) in tech.table.block1" class="border-bottom-0">
								<template v-for="(datum, datum_index) in row">
									<td class="border border-dark" :data-label="tech.table.block1[0][datum_index]">{{ datum }}</td>
								</template>
							</tr>
						</tbody>
					</table>
					<div class="col-lg-1"></div>
					<table class="table-type-2 table border border-dark text-left mt-4 col-lg-4">
						<thead>
							<tr class="border border-dark">
								<template v-for="(colname, index) in tech.table.block2[0]">
									<th class="border border-dark">{{ colname }}</th>
								</template>
							</tr>
						</thead>
						<tbody>
							<tr v-if="row_index > 0" v-for="(row, row_index) in tech.table.block2" class="border border-dark">
								<template v-for="(datum, datum_index) in row">
									<td class="border border-dark" :data-label="tech.table.block2[0][datum_index]">{{ datum }}</td>
								</template>
							</tr>
						</tbody>
					</table>

					<h5 v-if="summary.firstname2" class="col-12">{{ summary.firstname2 }}</h5>
					<table v-if="summary.firstname2" class="table-type-1 table border border-dark text-left mt-4 col-lg-7">
						<thead>
							<tr class="border border-dark">
								<template v-for="(colname, index) in tech.table_p2.block1[0]">
									<th class="border border-dark">{{ colname }}</th>
								</template>
							</tr>
						</thead>
						<tbody>
							<tr v-if="row_index > 0" v-for="(row, row_index) in tech.table_p2.block1" class="border border-dark pb-2">
								<template v-for="(datum, datum_index) in row">
									<td class="border border-dark" :data-label="tech.table_p2.block1[0][datum_index]">{{ datum }}</td>
								</template>
							</tr>
						</tbody>
					</table>
					<div v-if="summary.firstname2" class="col-lg-1"></div>
					<table v-if="summary.firstname2" class="table-type-2 table border border-dark text-left mt-4 col-lg-4">
						<thead>
							<tr class="border border-dark">
								<template v-for="(colname, index) in tech.table_p2.block2[0]">
									<th class="border border-dark">{{ colname }}</th>
								</template>
							</tr>
						</thead>
						<tbody>
							<tr v-if="row_index > 0" v-for="(row, row_index) in tech.table_p2.block2" class="border border-dark">
								<template v-for="(datum, datum_index) in row">
									<td class="border border-dark" :data-label="tech.table_p2.block2[0][datum_index]">{{ datum }}</td>
								</template>
							</tr>
						</tbody>
					</table>
				</div>
			</template>

			<div class="row" v-if="(additional_tables && !pagination) || (additional_tables && pagination && ((wheel && currentChapter == report.length + 2) || (!wheel && currentChapter == report.length + 1)))">
				<template v-for="a_table in additional_tables">
					<table class="table-additional-type-1 table border border-dark text-left mt-4 col-lg-7">
						<thead>
							<tr class="border border-dark">
								<template v-for="colname in a_table.block1[0]">
									<th class="border border-dark">{{ colname }}</th>
								</template>
							</tr>
						</thead>
						<tbody>
							<tr v-if="row_index > 0" v-for="(row, row_index) in a_table.block1" class="border border-dark">
								<template v-for="(datum, datum_index) in row">
									<td class="border border-dark" :data-label="a_table.block1[0][datum_index]">{{ datum }}</td>
								</template>
							</tr>
						</tbody>
					</table>
					<div class="col-lg-1"></div>
					<table class="table-additional-type-2 table border border-dark text-left mt-4 col-lg-4">
						<thead>
							<tr class="border border-dark">
								<template v-for="colname in a_table.block2[0]">
									<th class="border border-dark">{{ colname }}</th>
								</template>
							</tr>
						</thead>
						<tbody>
							<tr v-if="row_index > 0" v-for="(row, row_index) in a_table.block2" class="border border-dark">
								<template v-for="(datum, datum_index) in row">
									<td class="border border-dark" :data-label="a_table.block2[0][datum_index]">{{ datum }}</td>
								</template>
							</tr>
						</tbody>
					</table>
				</template>
			</div>
		<div v-if="pagination" id="pagination_controls" class="d-flex justify-content-around mt-2">
			<button class="btn btn-primary" @click="currentChapter--" :disabled="currentChapter == 0">
				<font-awesome-icon :icon="['fas', 'arrow-left']" />
			</button>
			<button class="btn btn-primary" @click="currentChapter++" :disabled="(currentChapter == report.length && !wheel && !additional_tables) || (currentChapter == report.length + 1 && wheel && !additional_tables) || (currentChapter == report.length + 1 && !wheel && additional_tables) || (currentChapter == report.length + 2 && wheel && additional_tables)">
				<font-awesome-icon :icon="['fas', 'arrow-right']" />
			</button>
		</div>
		<div v-if="summary" class="text-center m-2 p-2 report-summary">
			<div class="row mt-4 py-4">
				<div v-if="summary.metadata.lastname" class="col-sm-4 text-center">{{ summary.firstname }}&nbsp;{{ summary.metadata.lastname }}</div>
				<div v-else class="col-sm-4 text-center">{{ summary.firstname }}</div>
				<div class="col-sm-4 text-center">{{ summary.birthdate }}</div>
				<div class="col-sm-4 text-center">{{ summary.placename }}</div>
			</div>
			<div v-if="summary.metadata.profileid" class="row py-4">
				<div class="col-sm-4 text-center">{{ summary.firstname2 }}</div>
				<div class="col-sm-4 text-center">{{ summary.birthdate2 }}</div>
				<div class="col-sm-4 text-center">{{ summary.placename2 }}</div>
			</div>
			<div v-if="summary.metadata.placename || summary.metadata.repyear" class="row py-4">
				<div v-if="summary.metadata.placename" class="col-sm-6 text-center">{{ summary.metadata.placename }}</div>
				<div v-if="summary.metadata.repmonth && summary.metadata.repyear" class="col-sm-6 text-center">{{ summaryMonth }}&nbsp;{{ summary.metadata.repyear }}</div>
			</div>
			<div id="creditcode" v-if="$parent.$parent.creditcode" class="d-flex flex-column align-items-center">
				<div class="small font-weight-bold">Credit Code</div>
				<div class="small">{{ $parent.$parent.creditcode }}</div>
			</div>
		</div>
	</template>
	</div>
</template>

<script>
export default {
	data: function() {
		return {
			report: null,
			summary: null,
			tech: null,
			additional_tables: null,
			displayReportImages: ASTROWEB_CONFIG.DisplayReportImages,
			pagination: ASTROWEB_CONFIG.Pagination,
			currentChapter: 0,
			wheel: '',
			error: '',
			loading: true,
		};
	},
	mounted() {
			if(this.$parent.creditcodeProvidedByUser) {
				axios.get("https://astroweb.mx/rest/aw/reports/" + ASTROWEB_CONFIG.token + "/" + this.$parent.$parent.creditcode, this.$parent.$parent.$parent.config)
					.then((response) => {
						//console.log(response);
						this.loading = false;

						if(response.data.data) {
							this.handleReport(response.data.data);
						} else {
							//alert(response.data.errordata.message);
							console.error(response.data.errordata.message);
							this.error = response.data.errordata.message;
							//this.$parent.$parent.params.creditcode = '';
							this.$parent.$parent.creditcode = '';
							this.$parent.creditcodeProvidedByUser = false;
						}
					})
					.catch((error) => {
						this.loading = false;
						console.error(error);
					});
			} else {
				let postData = {
						//prodid: this.$parent.$parent.params.product_id,
						prodid: this.$parent.product.prodid,
						profileid: this.$parent.$parent.params.default_user_data.profileid,
						//creditcode: this.$parent.$parent.params.creditcode,
						creditcode: this.$parent.$parent.creditcode,
						custom: this.$parent.custom,
					};
				if(this.$parent.postmeta) {
					postData.metadata = this.$parent.postmeta;
				}
				axios.post("https://astroweb.mx/rest/aw/reports/" + ASTROWEB_CONFIG.token,
					postData,
					this.$parent.$parent.$parent.config)
					.then((response) => {
						//console.log(response);
						this.loading = false;

						if(response.data.data) {
							this.handleReport(response.data.data);
						} else {
							//alert(response.data.errordata.message);
							console.log(response.data.errordata.message);
							this.error = response.data.errordata.message;
						}
					})
					.catch((error) => {
						console.error(error);
						this.error = error.response.data;
					});
			}
	},
	methods: {
		handleReport(data) {
			this.report = data.report;
			if(data.summary) {
				this.summary = data.summary;
				this.summary.metadata = this.summary.metadata ? JSON.parse(this.summary.metadata) : '';
			}
			//Update product name in container component
			this.$parent.productId = data.summary.prodid;
			this.$parent.getProduct(true);

			if(data.tech) {
				this.tech = data.tech;
				let additionalTables = {};
				for (let k in this.tech) {
					if(this.tech.hasOwnProperty(k)
						&& k != "table_p2"
						&& /table_/.test(k)
					) {
						additionalTables[k] = this.tech[k];
					}
				}
				if(!$.isEmptyObject(additionalTables)){
					this.additional_tables = additionalTables;
				}
			}
			if(data.wheel) {
				this.wheel = "data:image/png;base64," + data.wheel;
			}
		},
	},
	computed: {
		summaryMonth: function() {
			if(this.summary) {
				return ASTROWEB_CONFIG.translate('labels_date_months')[this.summary.metadata.repmonth - 1];
			} else {
				return '';
			}
		},
	}
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 768px) {
	#wheel {
		width: 100%;
	}

	table {
		width: 100% !important;
	}

	.astro-component {
		table.table {
			border: 0 !important;
			.border {
					border: 0 !important;
				}
		}

	}

	table thead {
		display: none;
	}

	table tr {
		margin-bottom: 20px;
		display: block;
		border-bottom: 2px solid #ddd;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	table td {
		display: block;
		text-align: right;
		font-size: 13px;
	}

	table td:last-child {
		border-bottom: 0;
	}

	table td::before {
		content: attr(data-label);
		float: left;
		text-transform: uppercase;
		font-weight: bold;
	}

}

button img {
	height: 45px;
}

.report-summary {
	position: relative;
	#creditcode {
		color: rgb(239, 84, 115);
		position: absolute;
		left: 4px;
		top: 4px;
		padding: 2px;
		border: 1px dotted;
	}
}
</style>
