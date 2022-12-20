export const pageQuery = `
			{
				page {
					body {
						...on myproject {
							repeat {
								project {
									...on project {
										title
										description
										link
									}
								}
							}
						}
						...on hero {
							non-repeat {
								...non-repeatFields
							}
							repeat {
								...repeatFields
							}
						}
						...on form {
							non-repeat {
								...non-repeatFields
							}
							repeat {
								...repeatFields
							}
						}
					}
					meta_title
					meta_description
					social_cards
				}
			}
			`;
