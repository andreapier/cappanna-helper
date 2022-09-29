-- Estrazione qta totali per piatto per giorno
select strftime('%d/%m/%Y', c.CreationTimestamp) as giorno, m.Name as piatto, sum(d.Quantity)
from ChOrders as c
join OrderDetails as d on c.Id = d.OrderId
join MenuDetails as m on d.ItemId = m.Id
where m."Group" in ('Antipasti', 'Primi piatti', 'Secondi piatti', 'Contorni', 'Dolci')
group by strftime('%d/%m/%Y', c.CreationTimestamp), m.Name
order by m.Name, m."Group", giorno

-- Estrazione qta totali per vino per giorno
select strftime('%d/%m/%Y', c.CreationTimestamp) as giorno, m.Name as piatto, sum(d.Quantity)
from ChOrders as c
join OrderDetails as d on c.Id = d.OrderId
join MenuDetails as m on d.ItemId = m.Id
where m."Group" in ('Vini Bianchi', 'Vini Rossi', 'Bibite', 'Acqua')
group by strftime('%d/%m/%Y', c.CreationTimestamp), m.Name
order by m.Name, m."Group", giorno

