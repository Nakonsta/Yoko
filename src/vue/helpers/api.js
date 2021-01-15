export default {
    data() {
        return {
            CancelTokens: {
                catalogCancelToken: axios.CancelToken.source(),
                searchCancelToken: axios.CancelToken.source(),
                searchMarkCancelToken: axios.CancelToken.source(),
                searchMarksizeCancelToken: axios.CancelToken.source(),
                searchCompaniesCancelToken: axios.CancelToken.source(),
                companyCancelToken: axios.CancelToken.source(),
                proceduresCancelToken: axios.CancelToken.source(),
            },
        }
    },
    methods: {
        cancelCatalogRequest() {
            this.CancelTokens.catalogCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.catalogCancelToken = axios.CancelToken.source()
        },
        fetchInn(filterRequest) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies/`, {params: { inn: filterRequest }})
        },
        fetchCompaniesByInn(inn) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies/inn/${inn}/users`)
        },
        cancelCompanyRequest() {
            this.CancelTokens.companyCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.companyCancelToken = axios.CancelToken.source()
        },
        cancelMarketplaceProceduresRequest() {
            this.CancelTokens.proceduresCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.proceduresCancelToken = axios.CancelToken.source()
        },
        fetchFilter() {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/filter/`);
        },
        sendSettingsData(string, data) {
            if (!this.CancelTokens.catalogProceduresCancelToken) {
                this.CancelTokens.catalogProceduresCancelToken = axios.CancelToken.source()
            } else {
                this.CancelTokens.catalogProceduresCancelToken.cancel(
                    'Предыдущий запрос отменен запрос',
                )
                this.CancelTokens.catalogProceduresCancelToken = axios.CancelToken.source()
            }

            return axios.post(
                `${process.env.API_URL_AUTH_SERVICE}/user/settings/${string}`,
                data,
                { cancelToken: this.CancelTokens.catalogProceduresCancelToken.token },
            )
        },
        fetchCatalog(filter = null, page = 1) {
            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/`,
                {
                    ...filter,
                    page,
                },
                {cancelToken: this.CancelTokens.catalogCancelToken.token},
            );
        },
        getSettingsData(string) {
            return axios.get(
                `${process.env.API_URL_AUTH_SERVICE}/user/settings/${string}`,
            )
        },
        fetchTotalCatalog(group, filter) {
            let body = {}
            body.group = group

            if (filter) {
                body.filter = filter
            }

            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/total/`,
                body,
                {cancelToken: this.CancelTokens.catalogCancelToken.token},
            );
        },
        searchProceduresOKPD2(string) {
            return axios.get(
                `${process.env.API_URL_CONTENT_SERVICE}/api/digests/okpd/search/`,
                { params: { q: string } },
            )
        },
        searchProceduresOKVED(string) {
            return axios.get(
                `${process.env.API_URL_CONTENT_SERVICE}/api/digests/okved/search/`,
                { params: { q: string } },
            )
        },
        fetchListSearchCatalog(string, company_id = 0) {
            let params = {
                q: string,
            };
            if (company_id) {
                params.company_id = company_id;
            }
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/search/`, {
                params: params,
            });
        },
        fetchListSearchCompany(string) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/company/`, {
                params: {
                    q: string
                }
            });
        },
        authSignin(l, p) {
            return axios.post(`${process.env.API_URL_AUTH_SERVICE}/user/signin`, {
                login: l,
                password: p,
            });
        },
        fetchUser() {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/user/me`);
        },
        forgotPass(email) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/restore_password_request`, {
                params: {
                    email
                }
            });
        },
        getDate(data) {
            return axios.get(
                `${process.env.API_URL_CONTENT_SERVICE}/api/settings/tender/`,
                data,
            );
        },
        forgotPassChange(data) {
            return axios.post(
                `${process.env.API_URL_AUTH_SERVICE}/user/restore_password`,
                data,
            );
        },
        fetchSupportInfo() {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/settings/feedback/`);
        },
        fetchSupportTopics() {
            return axios.get(`${process.env.API_URL_NOTICE_SERVICE}/api/email/feedback/properties`);
        },
        fetchContragentFeedbackForm(s, f, e, p, c) {
            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/forms/call`, {
                subject: s,
                fio: f,
                email: e,
                phone: p,
                consent: c,
            });
        },
        fetchProceduresOKPD2(field) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/digests/${field}`)
        },
        fetchSupportForm(data) {
            return axios.post(`${process.env.API_URL_NOTICE_SERVICE}/api/email/feedback/send`, data);
        },
        fetchCountries() {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/digests/countries`);
        },
        fetchRegions() {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/digests/regions`);
        },
        fetchRegisteredCompanyFull(id) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies/${id}/full`)
        },
        sendRegistrationData(data) {
            return axios.post(`${process.env.API_URL_AUTH_SERVICE}/user/register`, data)
        },
        sendCatalogMark(data) {
            return axios.post(`${process.env.API_URL_OPERATOR_SERVICE}/api/products/mark/`, data);
        },
        sendCatalogMarksize(data) {
            return axios.post(`${process.env.API_URL_OPERATOR_SERVICE}/api/products/marksize/`, data);
        },
        fetchCatalogMarksizeProperties() {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/service/property_cable_type/`)
        },
        fetchQuotes(quote, date_start, date_end, mode) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/quotes`, {
                params: {
                    quote, date_start, date_end, mode
                }
            });
        },
        fetchLatestQuotes(quote, mode) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/quotes/latest/`, {
                params: { quote, mode }
            });
        },
        fetchQuotesDates(mode) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/quotes/dates/`, {
                params: { mode }
            });
        },
        fetchCompany(data) {
            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/company`,
                data,
                {cancelToken: this.CancelTokens.companyCancelToken.token},
            );
        },
        fetchCompanysByIds(ids) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies`,{
                params: {
                    ids: ids.join(','),
                },
            });
        },
        fetchCompaniesByINN(inn) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies`,{
                params: {
                    inn: inn.join(','),
                },
            });
        },
        cancelCompaniesRequest() {
            this.CancelTokens.searchCompaniesCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.searchCompaniesCancelToken = axios.CancelToken.source()
        },
        fetchCompaniesByName(name) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies`, {
                params: {
                    name: name
                },
                cancelToken: this.CancelTokens.searchCompaniesCancelToken.token,
            });
        },
        fetchCompaniesByIds(ids) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies`,{
                params: {
                    ids: ids.join(','),
                },
            });
        },
        fetchRegisteredCompany(id) {
          return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies/${id}`)
        },
        fetchCompanyReportForm(data) {
            return axios.post(`${process.env.API_URL_NOTICE_SERVICE}/api/`, data); // todo поставить url "проверка компании"
        },
        fetchMarketplaceProceduresFilter() {
            return axios.get(`${process.env.API_URL_TENDER_SERVICE}/api/procedure/filter`)
        },
        fetchMarketplaceProcedures(filter = null, page = 1) {
            return axios.post(
                `${process.env.API_URL_TENDER_SERVICE}/api/procedure/list`,
                {
                    ...filter,
                    page,
                },
                { cancelToken: this.CancelTokens.proceduresCancelToken.token },
            );
        },
        fetchProcedureApplications(id, page = 1) {
            return axios.post(
                `${process.env.API_URL_TENDER_SERVICE}/api/procedure/${id}/applications/list`,
                {page},
                { cancelToken: this.CancelTokens.proceduresCancelToken.token },
            );
        },
        sendProcedureApplicationDraft(id, data) {
            return axios.post(
                `${process.env.API_URL_TENDER_SERVICE}/api/procedure/${id}/participation-applications`,
                data
            )
        },
        sendProcedureApplication(id) {
            return axios.post(
                `${process.env.API_URL_TENDER_SERVICE}/api/participation-applications/${id}/status`,
                { status: 'submitted' }
            )
        },
        fetchProcedureApplication(id) {
            return axios.get(`${process.env.API_URL_TENDER_SERVICE}/api/participation-applications/${id}`)
        },
        addMarketplaceProcedureMark(id, mark) {
            const fData = new FormData();
            fData.append('mark_code', mark);
            return axios.post(`${process.env.API_URL_TENDER_SERVICE}/api/procedure/${id}/mark`, fData);
        },
        removeMarketplaceProcedureMark(id, mark) {
            return axios.delete(`${process.env.API_URL_TENDER_SERVICE}/api/procedure/${id}/mark/${mark}`)
        },
        fetchTenderItem(id) {
            return axios.get(`${process.env.API_URL_TENDER_SERVICE}/api/procedure/${id}`);
        },
        fetchSettingsProcedures() {
            return axios.get(
                `${process.env.API_URL_TENDER_SERVICE}/api/procedure/settings/`,
            )
        },
        fetchProceduresPropertyList(entity, property) {
            return axios.get(
                `${process.env.API_URL_TENDER_SERVICE}/api/procedure/property/${entity}/${property}`,
            )
        },
        fetchUsersFromCompany(id) {
            return axios.get(
                `${process.env.API_URL_AUTH_SERVICE}/companies/${id}/users`,
            )
        },
        cancelCatalogSearch() {
            this.CancelTokens.searchCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.searchCancelToken = axios.CancelToken.source()
        },
        fetchCatalogMark(string) {
            return axios.get(
                `${process.env.API_URL_CONTENT_SERVICE}/api/catalog/search/mark/`,
                {
                    params: {
                        q: string,
                    },
                    cancelToken: this.CancelTokens.searchMarkCancelToken.token,
                },
            )
        },
        cancelCatalogMarkSearch(){
            this.CancelTokens.searchMarkCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.searchMarkCancelToken = axios.CancelToken.source()
        },
        fetchCatalogMarksize(string) {
            return axios.get(
                `${process.env.API_URL_CONTENT_SERVICE}/api/catalog/search/marksize/`,
                {
                    params: {
                        q: string,
                    },
                    cancelToken: this.CancelTokens.searchMarksizeCancelToken.token,
                },
            )
        },
        cancelCatalogMarksizeSearch(){
            this.CancelTokens.searchMarkCancelToken.cancel(
                'Предыдущий запрос отменен',
            )
            this.CancelTokens.searchMarkCancelToken = axios.CancelToken.source()
        },
        fetchCatalogMarksizeOKPD(string, okpd) {
            return axios.get(
                `${process.env.API_URL_CONTENT_SERVICE}/api/catalog/search/marksize_with_okpd/`,
                {
                    params: {
                        q: string,
                        okpd_2_id: okpd,
                    },
                },
            )
        },
        sendProcedure(data, id) {
            const setId = id ? `/${id}` : ''
            return axios.post(
                `${process.env.API_URL_TENDER_SERVICE}/api/procedure${setId}`,
                data,
            )
        },
        fetchDaData(query) {
            return axios.post(
                process.env.DA_URL,
                {query},
                {
                    headers: {
                        Authorization: 'Token ' + process.env.DA_API_KEY,
                    },
                },
            )
        },
        fetchAccreditationsList(props) {
            const defaultProps = {
                orderBy: 'id',
                orderDir: 'DESC',
                page: 1,
                search: '',
            }

            const requestProps = Object.assign(defaultProps, props ?? {})

            const fData = new FormData()

            fData.append('page', requestProps.page)
            fData.append('order[by]', requestProps.orderBy)
            fData.append('order[direction]', requestProps.orderDir)

            if (requestProps.search !== '') {
                fData.append('q', requestProps.search)
            }

            return axios.post(`${process.env.API_URL_OPERATOR_SERVICE}/api/accreditation/list`, fData)
        },
        fetchAccreditationDetails(id) {
            return axios.get(`${process.env.API_URL_OPERATOR_SERVICE}/api/accreditation/${id}`)
        },
        updateAccreditation(id, data) {
            const fData = new FormData()

            for (const key in data) {
                fData.append(`documents[${key}]`, data[key])
            }

            return axios.post(`${process.env.API_URL_OPERATOR_SERVICE}/api/accreditation/${id}`, fData)
        },
        sendAccreditationCompany(data) {
            return axios.post(`${process.env.API_URL_OPERATOR_SERVICE}/api/accreditation`, data)
        },
        fetchAccreditationSampleRequiredFiles() {
            return axios.get(`${process.env.API_URL_OPERATOR_SERVICE}/api/accreditation/files`)
        },
        fetchCompanyByInn(inn) {
            return axios.get(`${process.env.API_URL_AUTH_SERVICE}/companies/inn/${inn}/full`);
        },
        fetchProductList(props) {
            let body = {}
            
            if(props.page !== null){
                body.page = props.page
            }
            if(props['order[created_at]'] !== null){
                body['order[created_at]'] = props['order[created_at]']
            }
            if(props['filter[status]'] !== null){
                body['filter[status]'] = props['filter[status]']
            } 
            if(props['filter[q]'] !== ''){
                body['filter[q]'] = props['filter[q]']
            }  
            
            return axios.get(`${process.env.API_URL_OPERATOR_SERVICE}/api/products/`, 
                {
                    params: body
                }            
            )
        },
        fetchProductDetails(id) {
            return axios.get(`${process.env.API_URL_OPERATOR_SERVICE}/api/products/${id}/`);
        },
        setCatalogPositionStatus(id, status = null, text_rejection = null) {
            return axios.patch(`${process.env.API_URL_OPERATOR_SERVICE}/api/products/${id}/`,
            {
                status,
                text_rejection,
            },
            )
        },
        fetchMark(id) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/mark/${id}/`)
        },
        fetchMarksizeDetail(id) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/marksize/${id}/`)
        },
        fetchMarksizeQuantity(id) {
            return axios.get(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/marksize/${id}/quantity/`);
        },
        filterMarksizeQuantity(id, data) {
            return axios.post(`${process.env.API_URL_CONTENT_SERVICE}/api/catalog/marksize/${id}/quantity/`,
                data,
                {cancelToken: this.CancelTokens.companyCancelToken.token}
            );
        },

        sendMarketplaceQuestion(id, data) {
            return axios.post(`${process.env.API_URL_TENDER_SERVICE}/api/procedure/${id}/q`, data)
        },
        sendMarketplaceAnswer(id, question_id, data) {
            return axios.post(`${process.env.API_URL_TENDER_SERVICE}/api/procedure/${id}/q/${question_id}/a`, data)
        },

        sendProcedureProtocols(id, data) {
            return axios.post(`${process.env.API_URL_TENDER_SERVICE}/api/procedure/${id}/protocols`, data)
        },
        fetchApplicationsList(filter = null, page = 1) {
            return axios.post(
                `${process.env.API_URL_TENDER_SERVICE}/api/participation-applications/list/`,
                {
                    ...filter,
                    page,
                },
                { cancelToken: this.CancelTokens.proceduresCancelToken.token },
            );
        },
        sendUserData(data) {
            return axios.post(`${process.env.API_URL_AUTH_SERVICE}/user/edit`, data)
        }
    }
}
