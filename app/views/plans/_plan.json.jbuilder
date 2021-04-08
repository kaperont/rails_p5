json.plan do
    json.student @plan.user.login
    json.name @plan.name
    json.major @plan.major.name
    json.currYear @plan.current_year
    json.currTerm @plan.current_semester
    json.courses @plan.plan_courses do |pc|
        json.id pc.course.designator
        json.year pc.year
        json.term pc.term
    end
    json.catYear @plan.catalog.year
end

json.catalog do
    json.year @plan.catalog.year
    json.courses @plan.catalog.catalog_courses do |logc|
        json.id logc.course.designator
        json.name logc.course.name
        json.description logc.course.description
        json.credits logc.course.credits
    end
end

json.categories do
    json.requirements @plan.major.requirements do |reqs|
        json.courses reqs.category.category_courses do |cc|
            json.id cc.course.designator
        end
    end
end